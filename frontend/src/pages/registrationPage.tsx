import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { useUser } from "@/contexts/usersContext.tsx";
import { RegistrationForm, RegistrationInput } from "@/components/registrationForm.tsx";
import { useState } from "react";
import { api } from "@/api/index.ts";

type ValidationResult = {
    success: boolean;
    errorMessage?: string;
}

function validateForm (input: RegistrationInput): ValidationResult {
    if (input.email.indexOf('@') === -1) return { success: false, errorMessage: "Email invalid" };
    if (input.username.length < 2) return { success: false, errorMessage: "Username invalid" };
    if (input.firstName.length === 0) return { success: false, errorMessage: "First name is empty" };
    if (input.lastName.length === 0) return { success: false, errorMessage: "Last name is empty" };
    return { success: true }
}

export const RegistrationPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRegistrationForm = async (userInput: RegistrationInput) => {
    setIsLoading(true);

    const validationResult = validateForm(userInput);
    if (!validationResult.success) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: validationResult.errorMessage,
      });
      return;
    }

    try {
        api.register(userInput).then(
            (response) => {
                setUser(response.data);
                setIsLoading(false);
                toast({
                    title: "Congratulations",
                    description:
                        "Your account has been successfully created! Redirecting home.",
                });

                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        )
    } catch (error: any) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.response.data.error,
        });
    }
  }

  return (
      <RegistrationForm
          onSubmit={(input: RegistrationInput) =>
              handleSubmitRegistrationForm(input)
          }
          isLoading={isLoading}
      />
  );
};
