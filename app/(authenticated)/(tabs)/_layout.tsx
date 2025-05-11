import Tabs from "@/app/components/Tabs";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? "calendar.circle.fill" : "calendar.circle",
          }),
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: () => ({ sfSymbol: "calendar" }),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? "text.magnifyingglass" : "magnifyingglass",
          }),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused }) => ({
            sfSymbol: focused ? "doc.text.image.fill" : "doc.text.image",
          }),
        }}
      />
    </Tabs>
  );
}
