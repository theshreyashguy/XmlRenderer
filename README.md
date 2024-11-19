# XML Form Renderer Application  

This repository contains a **React Native** application designed to dynamically render forms based on XML input. It provides users with two functionalities: rendering a form from an uploaded XML file and creating a form based on directly inputted XML. The application is tailored for developers and testers working with dynamic form rendering, XML parsing, and React Native-based mobile solutions.

---

## Example Usage Video  - **What It Covers**:

![](https://github.com/user-attachments/assets/d7b1f3e7-0ffb-4e4c-9bc7-d7d2d4498680)


  - Uploading an XML file and rendering the corresponding form.
  - Entering XML manually and generating dynamic forms.
  - Handling invalid inputs and showcasing the app's robustness.

---

## Features

- **Dynamic Form Rendering**:
  - Parse XML content and render forms dynamically using `WebView`.
  - Supports field types like text fields, radio buttons, date pickers, and drawing fields.

- **Two Input Options**:
  - **File Upload**: Select and render forms from XML files.
  - **Direct XML Input**: Enter XML manually via a text editor.

- **Error Handling**:
  - Detects invalid or empty XML files.
  - Provides user-friendly error messages for parsing and file validation.

- **Cross-Platform Compatibility**:
  - Works seamlessly on both Android and iOS platforms.

---

## Project Structure

1. **MainScreen**:  
   - Entry screen containing options to upload XML files or provide direct XML input.  
   - Includes modals for XML input and buttons for file-based rendering.  

2. **FormRenderer**:  
   - Dynamically generates and displays forms based on parsed XML content.  

3. **AppNavigation**:  
   - Navigation stack managing transitions between the `MainScreen` and `FormRenderer`.  

---


## Getting Started  

### Prerequisites

- Install **Node.js** and **npm**.
- Set up **React Native CLI** or **Expo** for your development environment.
- Ensure the mobile device/emulator has access to the file system (for file upload).

### Installation Steps

1. Clone this repository.  
2. Run `npm install` to install dependencies.  
3. Start the React Native server using `npm start` or `react-native run-android`/`run-ios`.  
4. Launch the app on your emulator or physical device.

---

## XML Input Guidelines

- Ensure the XML is **well-formed** and adheres to W3C standards.
- Include supported HTML tags to define form components:
  - **Text fields**, **radio buttons**, **date pickers**, and **drawing areas**.
- Save XML files with `.xml` or `.txt` extensions for successful uploads.

---

## Error Handling Scenarios

- **Invalid File Type**: Alerts the user and restricts processing.  
- **Empty XML File**: Prompts the user to upload a valid file.  
- **Improper XML Format**: Provides error messages highlighting the issue.  

---

## Contributing  

Contributions are welcome!  
1. Fork the repository.  
2. Create a new branch for your feature/fix.  
3. Submit a pull request with detailed descriptions of changes.

---

## License  

This project is licensed under the [MIT License](#).  

---

## Contact  

For queries or suggestions, please reach out to the repository maintainer.
