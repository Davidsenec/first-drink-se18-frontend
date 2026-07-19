import type { UserLogin, UserResponse } from "../types/user";
import mock from "../data/mock.json";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginUser(info: UserLogin): Promise<UserResponse> {
    await delay(300);
    const user = mock.find((u) => u.user_name === info.user_name);

    if (!user) {
        throw new Error("Invalid username or password");
    }
    if (user.password != info.password) {
        throw new Error("Invalid username or password");
    }
    const { password, ...userResponse } = user;
    return userResponse;
}