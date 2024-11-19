import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNFS from 'react-native-fs';
var parseString = require('react-native-xml2js').parseString;
import { RootStackParamList } from '../navigation/AppNavigation';
import { RouteProp } from '@react-navigation/native';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  route: DetailScreenRouteProp;
};

const MainScreen: React.FC<Props> = (Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [xmlInput, setXmlInput] = useState('');
  const navigation = Props.navigation;

  // Function to handle file picking
  const pickFile = async () => {
    try {
      const file: DocumentPickerResponse = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.plainText],
      });

      if (!file.name) {
        Alert.alert('No File Selected', 'Please select a file.');
        return;
      }

      if (!file.name.endsWith('.xml') && !file.name.endsWith('.txt')) {
        Alert.alert('Invalid File Type', 'Please select a valid XML file.');
        return;
      }

      const fileContent = await RNFS.readFile(file.uri, 'utf8');
      if (!fileContent || fileContent.trim().length === 0) {
        Alert.alert('Empty File', 'The selected file is empty.');
        return;
      }

      // Parse the XML content
      parseString(fileContent, (err: any, result: any) => {
        if (err) {
          Alert.alert('Invalid XML', 'The file content is not well-formed XML.');
          console.error('XML Parsing Error:', err);
          return;
        }

        const hasHtmlTag = /<html[\s\S]*?>/.test(fileContent);
        if (!hasHtmlTag) {
          Alert.alert(
            'Valid XML',
            'The XML does not contain an <html> tag but is valid. Rendering XML content.'
          );
        }

        // Navigate with content
        navigation.navigate('Detail', {
          htmlContent: `
            <body>
              <h1>Dynamic Form</h1>
              ${fileContent}
            </body>
          `,
        });
      });
    } catch (err: unknown) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking file:', err);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  // Function to handle XML input submission
  const handleXmlInput = () => {
    if (!xmlInput || xmlInput.trim().length === 0) {
      Alert.alert('Empty Input', 'Please provide some XML content.');
      return;
    }

    // Validate the XML content
    parseString(xmlInput, (err: any, result: any) => {
      if (err) {
        Alert.alert('Invalid XML', 'The input content is not well-formed XML.');
        console.error('XML Parsing Error:', err);
        return;
      }

      setModalVisible(false); // Close the modal
      navigation.navigate('Detail', {
        htmlContent: `
          <body>
            <h1>Dynamic Form</h1>
            ${xmlInput}
          </body>
        `,
      });
    });
  };

  return (
    <View style = {styles.container}>
    <ScrollView style={{flex:1}}>
      <ScrollView>
        <Text style={styles.instructionsHeader}>How to Structure XML for Form Rendering:</Text>
        <Text style={styles.instructions}>
          - Use valid XML format, and ensure the content is well-formed.{"\n"}
          - Include HTML tags if you wish to structure the UI dynamically.{"\n"}
          - For interactive form fields, use tags like:
        </Text>
        <Text style={styles.example}>
          {'<input type="text" placeholder="Enter name" />'} (Text Field){"\n"}
          {'<input type="date" />'} (Date Picker){"\n"}
          {'<input type="radio" name="gender" value="Male" /> Male'} (Radio Buttons){"\n"}
          {'<textarea rows="5" cols="30">Write here</textarea>'} (Text Area){"\n"}
          {'<canvas></canvas>'} (Drawing Canvas for user sketches)
        </Text>
        <Text style={styles.instructions}>
          - Save the XML file with a `.xml` extension or provide direct XML input in the second option.{"\n"}
          - Ensure the XML adheres to the W3C standards for best results.
        </Text>
      </ScrollView>

      {/* First Button */}
      <Button title="Render Form from XML File" onPress={pickFile} color="pink"  />

      {/* Second Button */}
      <Button
        title="Render Form from XML Input"
        onPress={() => setModalVisible(true)}
        color="blue"
      />

      {/* Modal for XML Input */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter XML Content</Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Paste your XML here"
              value={xmlInput}
              onChangeText={(text) => setXmlInput(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleXmlInput}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    padding: 20,
  },
  instructionsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black'
  },
  instructions: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'justify',
    color: 'black'
  },
  example: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    color: 'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'black',

  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    color: 'black',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  textInput: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MainScreen;
