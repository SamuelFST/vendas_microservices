import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', orderSchema);
