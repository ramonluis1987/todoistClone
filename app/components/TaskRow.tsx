import { Colors } from "@/constants/Colors";
import Todo from "@/types/todo";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface TaskRowProps {
  task: Todo;
  markAsCompleted: (taskId: number) => void;
}

const TaskRow = ({ task, markAsCompleted }: TaskRowProps) => {
  return (
    <View>
      <Link href={`/task/${task.id}`} style={styles.container} asChild>
        <TouchableOpacity>
          <View style={styles.row}>
            <BouncyCheckbox
              textContainerStyle={{ display: "none" }}
              fillColor={task.project?.color}
              unFillColor="#fff"
              size={25}
              isChecked={task.completed === 1}
              onPress={() => {
                markAsCompleted(task.id);
              }}
            />
            <Text style={styles.name}>{task.name}</Text>
          </View>
          <Text style={styles.projectname}>
            {task.project?.name || "No project"}
          </Text>
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
  projectname: {
    fontSize: 12,
    alignSelf: "flex-end",
    color: Colors.dark,
    marginTop: 4,
  },
});
