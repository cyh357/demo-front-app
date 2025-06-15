<template>
  <v-container class="d-flex justify-center">
    <v-card width="400">
      <v-card-title>회원가입</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister" ref="form">
          <v-row clas="align-center mb-20" no-gutters>
            <v-col cols="8">
              <!-- 아이디 -->
              <v-text-field
                v-model="user.userId"
                label="아이디"
                :rules="[required, idFormat]"
                :append-inner-icon="idChecked ? 'mdi-check-circle' : ''"
                :readonly="idChecked"
                required
                hide-details="auto"
              />
            </v-col>
            <v-col cols="4">
              <v-btn
                @click="checkuserId"
                block
                color="info"
                class="ma-0"
                style="height: 56px"
                >중복 확인</v-btn
              >
            </v-col>
          </v-row>
          <span class="text-caption" v-if="userIdMessage">{{
            userIdMessage
          }}</span>
          <!-- 비밀번호 -->
          <v-text-field
            v-model="user.password"
            label="비밀번호"
            type="password"
            :rules="[required, passwordComplexity]"
            required
          />
          <v-text-field
            v-model="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            :rules="[
              required,
              passwordComplexity,
              passwordMatch(user.password),
            ]"
          />

          <!-- 회원가입 버튼 -->
          <v-btn type="submit" block color="primary" class="mt-4"
            >회원가입</v-btn
          >
        </v-form>

        <v-btn block text @click="router.push('/login')">로그인</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import {
  required,
  idFormat,
  passwordComplexity,
  passwordMatch,
} from "@/utils/validationRules";
import axios from "axios";

const user = ref({
  userId: "",
  password: "",
});

const passwordConfirm = ref("");
// id 중복값 체크 완료 여부.
const idChecked = ref(false);
const userIdMessage = ref("");
const form = ref(null);
const router = useRouter();
const userStore = useUserStore();

const checkuserId = async () => {
  if (!user.value.userId) {
    userIdMessage.value = "아이디를 입력하세요.";
    return;
  }

  // 중복 여부 확인 시뮬레이션
  const res = await axios.get(`/api/user/idCheck/${user.value.userId}`);
  idChecked.value = !res.data;
  userIdMessage.value = res.data
    ? "이미 사용 중인 아이디입니다."
    : "사용 가능한 아이디입니다.";
};

const handleRegister = async () => {
  const valid = await form.value.validate();

  if (!valid.valid) return;
  if (!idChecked.value) {
    alert("아이디 중복 확인을 해주세요.");
    return;
  }

  const success = await userStore.register(user.value);
  if (success) {
    alert("회원가입 성공! 로그인 해주세요");
    router.push("/login");
  }
};
</script>
