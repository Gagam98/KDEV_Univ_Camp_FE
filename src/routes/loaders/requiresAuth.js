import { redirect } from "react-router-dom";
import { BASE_URL } from "@/api/config";
import { useUserStore } from "@/stores/user";

// TODO: API가 수정되면 username을 nickname으로 변경!!

export default async () => {
  const token = localStorage.getItem("userToken");
  console.log(token)
  try {
    const res = await fetch(`${BASE_URL}/api/token/validate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const data = await res.json();
    console.log('requiresAuth:', data)
    if (!data.username) {
      return redirect("/login");
    }
    useUserStore.setState({
      user: {
        nickname: data.username
      }
    })
  } catch (error) {
    return redirect("/login");
  }
  return true;
};
