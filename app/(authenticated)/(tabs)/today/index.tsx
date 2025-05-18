import Fab from "@/app/components/Fab";
import TaskRow from "@/app/components/TaskRow";
import { Colors } from "@/constants/Colors";
import { getTodos } from "@/services/todo.service";
import Todo from "@/types/todo";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

interface Section {
  title: string;
  data: Todo[];
}

const Page = () => {
  const [sectionListData, setSectionListData] = useState<Section[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();

      const groupedByDay = todos?.reduce(
        (acc: { [key: string]: Todo[] }, task: Todo) => {
          const day = format(
            new Date(task.due_date || new Date()),
            "d MMM · eee"
          );
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push(task);
          return acc;
        },
        {}
      );

      // Convert grouped data to sections array
      const listData = Object.entries(groupedByDay || {}).map(
        ([day, tasks]) => ({
          title: day,
          data: tasks as Todo[],
        })
      ) as Section[];

      // Sort sections by date
      listData.sort((a, b) => {
        const dateA = new Date(a.data[0].due_date || new Date());
        const dateB = new Date(b.data[0].due_date || new Date());
        return dateA.getTime() - dateB.getTime();
      });

      setSectionListData(listData);
    };

    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionListData}
        renderItem={({ item }) => <TaskRow task={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      ></SectionList>
      <Fab />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 82,
  },
  header: {
    fontSize: 16,
    backgroundColor: "#fff",
    fontWeight: "bold",
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
});
