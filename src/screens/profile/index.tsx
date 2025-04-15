import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout";
import Heading from "@/components/ui/heading";
import { Image, Text, View } from "react-native";
import ButtonBeta from "@/components/ui/buttons/buttonBeta";
import { AuthService } from "@/services/auth/auth.service";
import { API_URL } from "@/config/api.config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProfile } from "@/screens/profile/useProfile";

const Profile: React.FC = () => {
  const { setUser } = useAuth();
  const { profile } = useProfile();

  const { top } = useSafeAreaInsets();

  return (
    <Layout
      style={{
        paddingTop: top,
      }}
      className="px-6"
    >
      <Heading isCenter>Profile</Heading>

      <View className="my-6 items-center justify-center">
        <Image
          source={{
            uri: profile?.picture?.startsWith("http")
              ? profile.picture
              : `${API_URL}${profile?.picture ?? ""}`,
          }}
          className="w-28 h-28 rounded-full"
        />

        <Text>{profile?.email}</Text>
      </View>

      <ButtonBeta
        onPress={() => AuthService.logout().then(() => setUser(null))}
        className="mt-5"
      >
        Logout
      </ButtonBeta>
    </Layout>
  );
};

export default Profile;
