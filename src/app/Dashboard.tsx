import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
    semester: z.string().min(1, 'Please select a semester'),
    branch: z.string().min(1, 'Please select a branch'),
    section: z.string().min(1, 'Please select a section'),
    classroom: z.string().min(1, 'Please select a classroom'),
});

type FormData = z.infer<typeof formSchema>;

export function Dashboard() {
    const { handleSubmit, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const selectedBranch = watch('branch');
    const selectedSemester = watch('semester');

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        // Here you would typically send the data to your backend
        // fetch('/api/submit', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });
    };

    const branches = ['CSE', 'ECE', 'ME', 'CE', 'EE'];
    const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const getSections = (branch: string) => {
        // You can customize this based on your requirements
        return ['A', 'B', 'C'];
    };

    const getClassrooms = (section: string) => {
        // You can customize this based on your requirements
        return ['101', '102', '103', '104', '105'];
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto"
            >
                <motion.h1
                    className="text-3xl font-bold text-center mb-8"
                    whileHover={{ scale: 1.05 }}
                >
                    Classroom Dashboard
                </motion.h1>

                <motion.div
                    className="bg-card rounded-lg border shadow-sm p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="semester">Semester</Label>
                            <Select onValueChange={(value) => setValue('semester', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {semesters.map((sem) => (
                                        <SelectItem key={sem} value={sem}>
                                            Semester {sem}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Select onValueChange={(value) => setValue('branch', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {branches.map((branch) => (
                                        <SelectItem key={branch} value={branch}>
                                            {branch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {selectedBranch && (
                            <div className="space-y-2">
                                <Label htmlFor="section">Section</Label>
                                <Select onValueChange={(value) => setValue('section', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getSections(selectedBranch).map((section) => (
                                            <SelectItem key={section} value={section}>
                                                Section {section}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {selectedBranch && selectedSemester && (
                            <div className="space-y-2">
                                <Label htmlFor="classroom">Classroom</Label>
                                <Select onValueChange={(value) => setValue('classroom', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select classroom" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getClassrooms(selectedSemester).map((room) => (
                                            <SelectItem key={room} value={room}>
                                                Room {room}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}