# react-native-ai-chat

An unopinionated, highly customizeable AI Chat component for React Native.

Easily add an AI chat experience to your app in 1 line of code.

_\* Backend is required. Examples available in the examples directory_

## Installation

$ `npm install react-native-ai-chat --save`

or

$ `yarn add react-native-ai-chat`

## Usage

### Basic

```typescript
import { AiChat } from "react-native-ai-chat";

function App() {
  <>
    <AiChat apiUrl="http://192.168.1.120:5000/chat" />
  </>;
}
```

### UI Components

You can use components from

```typescript
import { AiChat } from "react-native-ai-chat";
import { Avatar, Button, TextInput, Message } from "ui-component-library";

function App() {
  <>
    <AiChat
      apiUrl="http://192.168.1.120:5000/chat"
      AvatarComponent={Avatar}
      ButtonComponent={Button}
      MessageComponent={Message}
      TextInputComponent={(props) => <TextInput extraProp={false} {...props} />}
    />
  </>;
}
```

## Component Props

```typescript
interface AiChatProps {
  // URL of the server endpoint to call
  apiUrl: string;

  // Id of the current chat (can be used to sync data with the backend)
  chatId?: string;

  // Send chatId with API Call
  sendChatId?: boolean;
  // Send message string with API Call
  sendMessage?: boolean;
  // Send messages array with API Call
  sendMessages?: boolean;

  // React-Native style object to style the avatar
  avatarStyle?: ViewStyle;
  // Size of the avatar component
  avatarSize?: number;
  // Text initials to use in the avatar of the AI
  avatarAiInitials?: string;
  // Text initials to use in the avatar of the user
  avatarUserInitials?: string;

  /* Overwrite background color of the component */
  backgroundColor?: string;

  // React-Native style object to style the send button
  buttonStyle?: ViewStyle;
  // React-Native style object to style the send button text
  buttonTextStyle?: TextStyle;
  // Text color of the send button
  buttonTextColor?: string;
  // Height of the send button
  buttonHeight?: number;
  // Width of the send button
  buttonWidth?: number;

  // React-Native style object to style the outer container
  containerStyle?: ViewStyle;
  // React-Native style object to style the chat container
  chatContainerStyle?: ViewStyle;
  // React-Native style object to style the form container
  formContainerStyle?: ViewStyle;

  // Component to use when the chat is empty
  emptyState?: React.ReactNode;

  // Default border radius TextInput and send Button
  radius?: number;
  // Default padding around the AiChat component
  padding?: number;
  // Default spacing between components in the chat
  spacing?: number;

  // External control to set the API sending state
  sending?: boolean;

  // Text to concatinate before the typed message
  preMessageText?: string;
  // Text to concatinate after the typed message
  postMessageText?: string;

  // Component to use replace the Avatar component
  AvatarComponent?: React.ComponentType<AvatarComponentProps>;
  // Component to use replace the Send Button component
  ButtonComponent?: React.ComponentType<TouchableOpacityProps>;
  // Component to use replace the TextInput component
  TextInputComponent?: React.ComponentType<TextInputProps>;
  // Component to use replace the Message bubble component
  MessageComponent?: React.ComponentType<ViewProps>;

  // React-Native style object to style the text input container
  textInputContainerStyle?: ViewStyle;
  // Height of the text input
  textInputHeight?: number;
  // React-Native style object to style the text input
  textInputStyle?: TextStyle;
  // Text to use as the text input placeholder
  textInputPlaceholder?: string;
  // React-Native props to pass to the TextInput component
  textInputProps?: React.ComponentProps<typeof TextInput>;
}
```

# Backend

A backend is required to use this component.

The backend can make a call to any AI service and return the response to the component.

## Request

The backend is called via `XMLHttpRequest` with a `POST` method matching the following interface for the post body:

```typescript
interface ApiRequestBody {
  // Id of the current chat (can be used to sync data with the backend)
  chatId?: string;
  // Message string of the last message typed
  message?: string;
  // Messages array of all messages between user an AI from oldest to newest
  messages?: ChatMessage[];
}

interface ChatMessage {
  content: string;
  sender: Sender;
}

export type Sender = "user" | "ai";
```

Each of `chatId`, `message` or `messages` can be disabled from sending via the component props.

## Response

The response expected is simply the last message from the AI as a `string`.

## Examples

Current backend examples available:

- OpenAI + Express

# Testing

Coming Soon™
