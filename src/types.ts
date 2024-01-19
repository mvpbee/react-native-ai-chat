import {
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from "react-native";

export interface AiChatProps {
  apiUrl: string;
  chatId?: string;

  sendChatId?: boolean;
  sendMessage?: boolean;
  sendMessages?: boolean;

  avatarStyle?: ViewStyle;
  avatarSize?: number;
  avatarAiInitials?: string;
  avatarUserInitials?: string;

  backgroundColor?: string;

  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  buttonTextColor?: string;
  buttonHeight?: number;
  buttonWidth?: number;

  containerStyle?: ViewStyle;
  chatContainerStyle?: ViewStyle;
  formContainerStyle?: ViewStyle;

  emptyState?: React.ReactNode;

  radius?: number;
  padding?: number;
  spacing?: number;
  sending?: boolean;

  preMessageText?: string;
  postMessageText?: string;

  AvatarComponent?: React.ComponentType<AvatarComponentProps>;
  ButtonComponent?: React.ComponentType<TouchableOpacityProps>;
  TextInputComponent?: React.ComponentType<TextInputProps>;
  MessageComponent?: React.ComponentType<ViewProps>;

  textInputContainerStyle?: ViewStyle;
  textInputHeight?: number;
  textInputStyle?: TextStyle;
  textInputPlaceholder?: string;
  textInputProps?: React.ComponentProps<typeof TextInput>;
}

export type Sender = "user" | "ai";

export interface ChatMessage {
  content: string;
  sender: Sender;
}

export interface AvatarComponentProps extends ViewProps {
  sender: Sender;
}

export interface ApiRequestBody {
  chatId?: string;
  message?: string;
  messages?: ChatMessage[];
}
