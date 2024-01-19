import {StyleSheet} from 'react-native';
import {AiChatProps} from './types';

export const getStyles = (props: AiChatProps) => {
  const {
    avatarSize = 32,

    buttonHeight = 40,
    buttonTextColor,
    buttonWidth = 80,

    radius = 4,
    padding = 16,
    sending: _sending = false,
    spacing = 8,

    textInputHeight = 40,
  } = props;

  return StyleSheet.create({
    Avatar: {
      height: avatarSize,
      width: avatarSize,
      borderRadius: avatarSize,
      backgroundColor: '#f66',
      marginRight: spacing,
      justifyContent: 'center',
      alignItems: 'center',
    },
    AvatarUser: {
      marginLeft: spacing,
      backgroundColor: '#66f',
    },
    Container: {
      flex: 1,
    },
    ScrollContainer: {
      flex: 1,
    },
    ChatContainer: {
      flex: 1,
      padding,
      paddingBottom: 0,
    },
    FormContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding,
    },
    TextInputContainer: {
      flex: 1,
      marginRight: spacing,
    },
    TextInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#999',
      borderRadius: radius,
      paddingHorizontal: padding,
      height: textInputHeight,
    },
    Button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9df',
      paddingHorizontal: padding / 2,
      paddingVertical: padding / 4,
      height: buttonHeight,
      width: buttonWidth,
      borderRadius: radius,
    },
    ButtonDisabled: {},
    ButtonText: {
      color: buttonTextColor || '#333',
    },
    MessageContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing,
    },
    MessageContainerUser: {
      flexDirection: 'row-reverse',
    },
    MessageContentContainer: {
      flex: 1,
      backgroundColor: '#fee',
      padding: padding / 2,
      borderRadius: radius,
    },
    MessageContentContainerUser: {
      flex: 1,
      backgroundColor: '#eef',
      padding: padding / 2,
      borderRadius: padding / 2,
    },
  });
};
