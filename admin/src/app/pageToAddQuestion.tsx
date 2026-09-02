import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type QuestionType = 'multiple-choice' | 'checkbox' | 'short-answer' | 'paragraph';

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    type: QuestionType;
    title: string;
    required: boolean;
    options: Option[];
}

export default function QuestionForm() {
    const [title, setTitle] = useState('Untitled Form');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([{
        id: '1',
        type: 'multiple-choice',
        title: '',
        required: false,
        options: [{ id: '1', text: '' }, { id: '2', text: '' }]
    }]);

    const addQuestion = () => {
        const newQuestion: Question = {
            id: String(Date.now()),
            type: 'multiple-choice',
            title: '',
            required: false,
            options: [
                { id: String(Date.now() + 1), text: '' },
                { id: String(Date.now() + 2), text: '' }
            ]
        };
        setQuestions([...questions, newQuestion]);
    };

    const duplicateQuestion = (index: number) => {
        const questionToDuplicate = questions[index];
        const duplicatedQuestion = {
            ...questionToDuplicate,
            id: String(Date.now()),
            options: questionToDuplicate.options.map(opt => ({
                ...opt,
                id: String(Date.now() + Math.random())
            }))
        };
        const newQuestions = [...questions];
        newQuestions.splice(index + 1, 0, duplicatedQuestion);
        setQuestions(newQuestions);
    };

    const deleteQuestion = (index: number) => {
        if (questions.length > 1) {
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
        }
    };

    const addOption = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push({
            id: String(Date.now()),
            text: ''
        });
        setQuestions(newQuestions);
    };

    const updateQuestionType = (questionIndex: number, type: QuestionType) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].type = type;
        setQuestions(newQuestions);
    };

    const updateQuestionTitle = (questionIndex: number, title: string) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].title = title;
        setQuestions(newQuestions);
    };

    const updateOptionText = (questionIndex: number, optionIndex: number, text: string) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].text = text;
        setQuestions(newQuestions);
    };

    const toggleRequired = (questionIndex: number) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].required = !newQuestions[questionIndex].required;
        setQuestions(newQuestions);
    };

    const handleSubmit = () => {
        console.log({
            title,
            description,
            questions
        });
        // Here you would send the data to your backend
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <motion.div
                className="bg-white rounded-lg border p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-3xl font-bold w-full border-b-2 border-purple-200 focus:border-purple-500 outline-none pb-2"
                    placeholder="Form title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-4 p-2 border-b-2 border-purple-200 focus:border-purple-500 outline-none resize-none"
                    placeholder="Form description"
                    rows={2}
                />
            </motion.div>

            <AnimatePresence>
                {questions.map((question, questionIndex) => (
                    <motion.div
                        key={question.id}
                        className="bg-white rounded-lg border p-6 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="flex items-start gap-4">
                            <GripVertical className="mt-2 text-gray-400" />
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start gap-4">
                                    <input
                                        type="text"
                                        value={question.title}
                                        onChange={(e) => updateQuestionTitle(questionIndex, e.target.value)}
                                        className="flex-1 text-lg border-b-2 border-purple-200 focus:border-purple-500 outline-none pb-1"
                                        placeholder="Question"
                                    />
                                    <Select
                                        value={question.type}
                                        onValueChange={(value: QuestionType) => updateQuestionType(questionIndex, value)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                            <SelectItem value="checkbox">Checkbox</SelectItem>
                                            <SelectItem value="short-answer">Short Answer</SelectItem>
                                            <SelectItem value="paragraph">Paragraph</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {(question.type === 'multiple-choice' || question.type === 'checkbox') && (
                                    <div className="space-y-2">
                                        {question.options.map((option, optionIndex) => (
                                            <div key={option.id} className="flex items-center gap-2">
                                                {question.type === 'multiple-choice' ? (
                                                    <div className="w-4 h-4 rounded-full border border-gray-300" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded border border-gray-300" />
                                                )}
                                                <input
                                                    type="text"
                                                    value={option.text}
                                                    onChange={(e) => updateOptionText(questionIndex, optionIndex, e.target.value)}
                                                    className="flex-1 border-b border-gray-200 focus:border-purple-500 outline-none"
                                                    placeholder={`Option ${optionIndex + 1}`}
                                                />
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => addOption(questionIndex)}
                                            className="mt-2"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Option
                                        </Button>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={question.required}
                                            onChange={() => toggleRequired(questionIndex)}
                                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                        />
                                        Required
                                    </label>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => duplicateQuestion(questionIndex)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteQuestion(questionIndex)}
                                            disabled={questions.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            <div className="flex gap-4">
                <Button onClick={addQuestion} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Question
                </Button>
                <Button onClick={handleSubmit} variant="default">
                    Save Form
                </Button>
            </div>
        </div>
    );
}