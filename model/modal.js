export const modal = {
  createModal: (title, content = null, inputs = null, buttons = null) => {
    return {
      title,
      content,
      inputs,
      buttons,
    };
  },
};
