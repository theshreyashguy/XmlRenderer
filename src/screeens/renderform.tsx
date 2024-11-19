import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigation'; // Adjust the import based on your structure.

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailScreenRouteProp;
};

const FormRenderer: React.FC<Props> = ({ route }) => {
  const { htmlContent } = route.params;

  const htmlString = `<!DOCTYPE html>
    <html>
      ${htmlContent}
    </html>`;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlString }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'pink' },
  webview: { flex: 1 },
});

export default FormRenderer;
