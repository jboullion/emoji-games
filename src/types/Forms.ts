export const fieldProps = {
  label: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  error: {
    type: String,
  },
  wrapClass: {
    type: String,
  },
  // describedBy: {
  //   type: String,
  // },
  // describedByError: {
  //   type: String,
  // },
};
