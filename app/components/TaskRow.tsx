import { Colors } from "@/constants/Colors";
import Todo from "@/types/todo";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface TaskRowProps {
  task: Todo;
}

const TaskRow = ({ task }: TaskRowProps) => {
  console.log("task", task);
  return (
    <View>
      <Link href={`/task/${task.id}`} style={styles.container} asChild>
        <TouchableOpacity>
          <View style={styles.row}>
            <BouncyCheckbox
              textContainerStyle={{ display: "none" }}
              fillColor={task.project?.color}
              size={25}
              isChecked={task.completed === 1}
              onPress={() => {}}
            />
            <Text style={styles.name}>{task.name}</Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TaskRow;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  name: {
    fontSize: 16,
    flex: 1,
    paddingRight: 20,
  },
});
