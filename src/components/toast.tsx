import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface AlertProps {
    type: "error" | "success";
    message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
    const { toast } = useToast();

    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    title: type === "success" ? "Success!" : "Error!",
                    description: message,

                });
            }}
        >
            Show Toast
        </Button>
    );
};
