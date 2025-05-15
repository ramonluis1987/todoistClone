import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, IconButton, Menu } from "react-native-paper";
import { toast } from "sonner-native";
type MoreButtonProps = {
  pageName: string;
};

const MoreButton = ({ pageName }: MoreButtonProps) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const copyToClipboard = async () => {
    const path = `myapp://(authenticated)/(tabs)/${pageName.toLowerCase()}`;
    await Clipboard.setStringAsync(path);
    toast.success(`Page Link copied to your clipboard`);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
    >
      <Menu.Item onPress={() => console.log("Copy")} title="Copy" />
      <Divider />
      <Menu.Item
        onPress={() => console.log("Select Tasks")}
        title="Select Tasks"
      />
      <Menu.Item onPress={() => console.log("View")} title="View" />
      <Menu.Item
        onPress={() => console.log("Activity Log")}
        title="Activity Log"
      />
    </Menu>
  );
};

export default MoreButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
});
