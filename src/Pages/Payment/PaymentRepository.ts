import APIHelper from "../../components/APIHelper"; // Replace with your API handling logic
import PaymentModel from "./PaymentModel";

class PaymentRepository {
  api:APIHelper
  
  constructor() {
    this.api = new APIHelper(); // Initialize your API helper or use fetch directly
  }

  getAllPayments = async () => {
    try {
      const response = await this.api.get('/payments');
      return response.data.map((payment:any) => new PaymentModel(payment));
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  };

  getPayment = async (pymId:any) => {
    try {
      const response = await this.api.get(`/payments/${pymId}`);
      return new PaymentModel(response.data);
    } catch (error) {
      console.error(`Error fetching payment with ID ${pymId}:`, error);
      throw error;
    }
  };

  async createPayment (paymentData:any) : Promise<boolean | null>   {
    try {
      const response = await this.api.post('payments', paymentData);
      return true;
    } catch (error) {
      console.error('Error creating payment:', error);
      return false;
    }
    return false;
  };

  async updatePayment  (pymId:any, paymentData:any): Promise<boolean | null> {
    try {
      const response = await this.api.patch(`/payments/${pymId}`, paymentData);
      var res=response;
      return true;
    } catch (error) {
      console.error(`Error updating payment with ID ${pymId}:`, error);
      throw error;
    }
    return false;
  };

  deletePayment = async (pymId:any) => {
    try {
      await this.api.delete(`/payments/${pymId}`);
      return { message: 'Payment deleted' };
    } catch (error) {
      console.error(`Error deleting payment with ID ${pymId}:`, error);
      throw error;
    }
  };
}

export default PaymentRepository;