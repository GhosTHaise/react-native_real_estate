import FeaturedCard, { Card } from "@/components/cards";
import Filters from "@/components/filters";
import NoResult from "@/components/noResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/globalProvider";
import { useAppwrite } from "@/lib/useApprwite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string, filter?: string }>();

  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties, params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20
    })
  }, [params.filter, params.query])
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item, index) => "card" + item.toString() + index}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? <ActivityIndicator size="large" className="text-primary-300 mt-5" /> : <NoResult />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for your Ideal Home
              </Text>
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
