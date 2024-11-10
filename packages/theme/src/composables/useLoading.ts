import { ref, onMounted } from 'vue';
export function useLoading(importTask: any) {
  const isLoading = ref(true);
  onMounted(() => {
    importTask().then(() => {
      isLoading.value = false;
    });
  });
  return {
    isLoading,
  };
}
