import Fab from "@/app/components/Fab";
import { Colors } from "@/constants/Colors";
import { deleteProject, getProjects } from "@/services/project.service";
import Project from "@/types/project";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();

        console.log("Fetched projects:", projects);
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const onDeleteProject = async (projectId: number) => {
    try {
      await deleteProject(projectId);
      router.push("/(authenticated)/(tabs)/browse");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // const onNewProject = () => {};

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>My Projects</Text>
          <TouchableOpacity
            onPress={() =>
              router.push("/(authenticated)/(tabs)/browse/new-project")
            }
          >
            <Ionicons
              name="add"
              size={24}
              color={Colors.dark}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              {/* <Button title="Delete" onPress={() => onDeleteProject(item.id)} /> */}
            </View>
          )}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setProjects([])}
            >
              <Text style={styles.clearButtonText}>Clear Projects</Text>
            </TouchableOpacity>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>

      <Fab />
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clearButton: {
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightBorder,
  },
});
