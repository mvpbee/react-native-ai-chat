import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { AiChatProps, ApiRequestBody, ChatMessage } from "./types";
import { getStyles } from "./style";

const LOADING_STRING = "...";

export const AiChat: React.FC<AiChatProps> = (props) => {
  const {
    apiUrl,
    chatId,

    sendChatId = true,
    sendMessage = true,
    sendMessages = true,

    avatarStyle,
    avatarAiInitials = "AI",
    avatarUserInitials = "ME",

    buttonStyle,
    buttonTextStyle,

    containerStyle,
    chatContainerStyle,
    emptyState,
    formContainerStyle,

    sending: _sending = false,

    textInputContainerStyle,
    textInputStyle,
    textInputPlaceholder = "Type a message...",
    textInputProps,

    preMessageText: preMessageString,
    postMessageText: postMessageString,

    AvatarComponent,
    ButtonComponent,
    MessageComponent,
    TextInputComponent,
  } = props;

  const styles = React.useMemo(() => getStyles(props), []);

  const [message, setMessage] = React.useState<string>("");
  const [sending, setSending] = React.useState<boolean>(_sending);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const onPress = React.useCallback(async () => {
    if (sending) {
      return;
    }

    const finalMessage =
      (preMessageString || "") + (message || "") + (postMessageString || "");

    setSending(true);
    setMessages((messages) => [
      ...messages,
      { content: finalMessage, sender: "user" },
    ]);

    try {
      const req = new XMLHttpRequest();
      req.onreadystatechange = () => {
        if (req.readyState === 1) {
          setMessages((messages) => [
            ...messages,
            { content: LOADING_STRING, sender: "ai" },
          ]);
        } else if (req.readyState === 3) {
          setMessages((messages) => {
            const lastMessage = messages.pop();
            if (lastMessage?.content === LOADING_STRING) {
              lastMessage.content = "";
            }
            return [
              ...messages,
              {
                content: lastMessage?.content + req.responseText,
                sender: "ai",
              },
            ];
          });
        } else if (req.readyState === 4) {
          setSending(false);
          setMessage("");
        }
      };
      req.open("POST", apiUrl);
      req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

      const body: ApiRequestBody = {};
      if (sendChatId) {
        body["chatId"] = chatId;
      }
      if (sendMessage) {
        body["message"] = message;
      }
      if (sendMessages) {
        body["messages"] = messages;
      }
      req.send(JSON.stringify(body));
    } catch (e) {
      console.error(e);
    }

    setSending(false);
  }, [sending, message]);

  const UseAvatarComponent = AvatarComponent || View;
  const UseButtonComponent = ButtonComponent || TouchableOpacity;
  const UseMessageComponent = MessageComponent || View;
  const UseInputComponent = TextInputComponent || TextInput;

  return (
    <View style={[styles.Container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        style={[styles.ScrollContainer, {}]}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        <View style={[styles.ChatContainer, chatContainerStyle]}>
          {messages.length ? (
            messages.map((message, i) => (
              <View
                key={i}
                style={[
                  styles.MessageContainer,
                  message.sender === "user" ? styles.MessageContainerUser : {},
                ]}
              >
                <UseAvatarComponent
                  sender={message.sender}
                  style={[
                    styles.Avatar,
                    avatarStyle,
                    message.sender === "user" ? styles.AvatarUser : {},
                  ]}
                >
                  <Text>
                    {message.sender === "user"
                      ? avatarUserInitials
                      : avatarAiInitials}
                  </Text>
                </UseAvatarComponent>
                <UseMessageComponent
                  style={[
                    styles.MessageContentContainer,
                    message.sender === "user"
                      ? styles.MessageContentContainerUser
                      : {},
                  ]}
                >
                  <Text>{message.content}</Text>
                </UseMessageComponent>
              </View>
            ))
          ) : (
            <Text>{emptyState || "Can I help you?"}</Text>
          )}
        </View>
      </ScrollView>
      <View style={[styles.FormContainer, formContainerStyle]}>
        <View style={[styles.TextInputContainer, textInputContainerStyle]}>
          <UseInputComponent
            value={message}
            readOnly={sending}
            onChangeText={setMessage}
            style={[styles.TextInput, textInputStyle]}
            placeholder={textInputPlaceholder}
            {...textInputProps}
          />
        </View>
        <UseButtonComponent
          onPress={onPress}
          style={[styles.Button, buttonStyle]}
        >
          {sending ? (
            <ActivityIndicator />
          ) : (
            <Text style={[styles.ButtonText, buttonTextStyle]}>Send</Text>
          )}
        </UseButtonComponent>
      </View>
    </View>
  );
};
