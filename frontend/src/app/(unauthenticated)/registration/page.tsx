import { RegisterForm } from "@/components/froms/register-form";
import SnackbarComponent from "@/components/snackbarComponent/snackbarComponent";

export default function RegistrationPage() {
  return (
    <div>
      <RegisterForm />
      <SnackbarComponent />
    </div>
  );
}
