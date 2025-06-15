<template>
  <v-container class="d-flex justify-center">
    <v-card width="400">
      <v-card-title>로그인</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="user.userId"
            label="아이디"
            :rules="[required]"
            required
          />
          <v-text-field
            v-model="user.password"
            label="비밀번호"
            type="password"
            :rules="[required]"
            required
          />
          <v-btn type="submit" block color="primary">로그인</v-btn>
        </v-form>
        <v-btn block text @click="router.push('/register')">회원가입</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { required } from "@/utils/validationRules";

const user = ref({
  userId: "",
  password: "",
});
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  const success = await userStore.login(user.value);

  if (success) {
    alert("로그인 성공!");
    router.push("/");
  } else {
    alert("로그인 실패");
    window.location.reload();
  }
};
</script>
