import { defineStore } from 'pinia';
const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refsh: false,
    };
  },
  actions: {},
});

export default useLayOutSettingStore;
