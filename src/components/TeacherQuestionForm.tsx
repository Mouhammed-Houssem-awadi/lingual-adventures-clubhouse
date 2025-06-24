
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, BookOpen } from 'lucide-react';

const TeacherQuestionForm: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !question || !subject) {
      toast({
        title: "Missing Information! 📝",
        description: "Please fill in all fields before sending your question.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending question to teacher
    setTimeout(() => {
      toast({
        title: "Question Sent! 🚀",
        description: "Your teacher will answer soon. Keep learning!",
      });
      setStudentName('');
      setQuestion('');
      setSubject('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="kid-card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">👩‍🏫📚</div>
        <h2 className="text-2xl font-bold text-kid-purple mb-2">
          Ask Your Teacher!
        </h2>
        <p className="text-gray-600">
          Have a question? Your teacher is here to help you learn!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-bold text-kid-purple mb-2">
            Your Name 🌟
          </label>
          <Input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="What's your name?"
            className="text-lg p-4 rounded-xl border-2 border-kid-blue/30 focus:border-kid-purple"
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-kid-purple mb-2">
            What's your question about? 📖
          </label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Grammar, vocabulary, pronunciation..."
            className="text-lg p-4 rounded-xl border-2 border-kid-blue/30 focus:border-kid-purple"
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-kid-purple mb-2">
            Your Question ❓
          </label>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything! Your teacher loves to help..."
            rows={4}
            className="text-lg p-4 rounded-xl border-2 border-kid-blue/30 focus:border-kid-purple resize-none"
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`
              game-button w-full max-w-xs
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Question! 📨
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 bg-kid-yellow/20 rounded-xl p-4">
        <h3 className="font-bold text-kid-purple mb-2 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          💡 Tips for Great Questions:
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Be specific about what you don't understand</li>
          <li>• Include examples if you have them</li>
          <li>• Ask about grammar rules, new words, or pronunciation</li>
          <li>• Don't be shy - there are no silly questions! 🌈</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherQuestionForm;
