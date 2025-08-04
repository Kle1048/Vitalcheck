// Gesundheits- & Fitnessumfrage App
class HealthSurveyApp {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.firstName = '';
        this.questions = [
            "Haben Sie tagsüber \"Energielöcher\" oder fühlen sich häufig müde und erschöpft?",
            "Fällt es Ihnen schwer, sich über längere Zeit zu konzentrieren?",
            "Leiden Sie ab und zu unter Kopfschmerzen und/oder Migräne?",
            "Leiden Sie unter häufigem Frieren (kalte Hände, kalte Füße)?",
            "Trinken Sie weniger als 2,5 Liter (ohne Kohlensäure) Wasser pro Tag?",
            "Sind Sie anfällig für Erkältungen oder Infekte?",
            "Machen Sie an weniger als 3 Tagen die Woche mindestens 30 Minuten Sport?",
            "Rauchen Sie?",
            "Haben Sie Probleme mit der Verdauung, dem Darm oder dem Magen?",
            "Werden Sie regelmäßig von Allergien (z. B. Heuschnupfen) heimgesucht und/oder leiden Sie an Neurodermitis oder Schuppenflechte?",
            "Essen Sie weniger als 5–6 Portionen frisches Obst und Gemüse täglich à 150 Gramm?",
            "Haben Sie manchmal Verspannungen, Wadenkrämpfe und/oder steife, müde Gelenke oder Gelenkschmerzen?",
            "Haben Sie oft Probleme einzuschlafen und/oder einen erholsamen Schlaf zu finden?",
            "Sind Sie von Osteoporose oder Arthrose betroffen?",
            "Neigen Sie schnell zur Übersäuerung?", // Special question with sub-questions
            "Möchten Sie Ihren Körper modellieren und Ihre Figur besser in Form bringen?",
            "Sind Sie über 35 Jahre alt?",
            "Sind Sie von Diabetes betroffen?",
            "Leiden Sie unter Herz-Kreislauf-Beschwerden und/oder hatten Sie schon einmal einen Herzinfarkt?",
            "Ist Ihr Cholesterinwert erhöht?",
            "Essen Sie weniger als 2–3 Mal pro Woche Lachs, Makrele oder Thunfisch?",
            "Nehmen Sie Medikamente und/oder die Antibabypille?"
        ];

        this.subQuestions = [
            "Essen Sie viel Fleisch bzw. Schweinefleisch? (Harnsäure / Schwefelsäure)",
            "Essen Sie viel Süßes oder Fettes? (Essigsäure)",
            "Essen Sie Käse und/oder Wurst? (Salpetersäure)",
            "Trinken Sie Kaffee oder schwarzen Tee? (Gerbsäure)",
            "Treiben Sie viel Sport? (Milchsäure)"
        ];

        this.initializeApp();
        this.loadFromLocalStorage();
    }

    initializeApp() {
        // Start screen elements
        const firstnameInput = document.getElementById('firstname');
        const startBtn = document.getElementById('start-btn');

        // Question screen elements
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const backBtn = document.getElementById('back-btn');
        const nextBtn = document.getElementById('next-btn');

        // Sub-questions screen elements
        const subBackBtn = document.getElementById('sub-back-btn');
        const subNextBtn = document.getElementById('sub-next-btn');

        // Completion screen elements
        const sendEmailBtn = document.getElementById('send-email-btn');
        const downloadCsvBtn = document.getElementById('download-csv-btn');

        // Event listeners
        firstnameInput.addEventListener('input', (e) => {
            this.firstName = e.target.value.trim();
            startBtn.disabled = this.firstName.length === 0;
        });

        startBtn.addEventListener('click', () => this.startSurvey());
        yesBtn.addEventListener('click', () => this.answerQuestion('Ja'));
        noBtn.addEventListener('click', () => this.answerQuestion('Nein'));
        backBtn.addEventListener('click', () => this.previousQuestion());
        nextBtn.addEventListener('click', () => this.nextQuestion());
        
        subBackBtn.addEventListener('click', () => this.previousQuestion());
        subNextBtn.addEventListener('click', () => this.nextQuestion());
        
        sendEmailBtn.addEventListener('click', () => this.sendEmail());
        downloadCsvBtn.addEventListener('click', () => this.downloadCsv());

        // Enter key support
        firstnameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.firstName.length > 0) {
                this.startSurvey();
            }
        });
    }

    startSurvey() {
        if (this.firstName.length === 0) return;
        
        this.showScreen('question-screen');
        this.displayQuestion();
        this.saveToLocalStorage();
    }

    showScreen(screenId) {
        // Hide all screens
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('question-screen').classList.add('hidden');
        document.getElementById('sub-questions-screen').classList.add('hidden');
        document.getElementById('completion-screen').classList.add('hidden');

        // Show target screen
        document.getElementById(screenId).classList.remove('hidden');
    }

    displayQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showCompletionScreen();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const questionNumber = this.currentQuestion + 1;
        const progress = Math.round((questionNumber / this.questions.length) * 100);

        // Update progress
        document.getElementById('progress-text').textContent = `Frage ${questionNumber} von ${this.questions.length}`;
        document.getElementById('progress-percentage').textContent = `${progress}%`;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // Update question text
        document.getElementById('question-text').textContent = question;

        // Handle special case for question 15 (sub-questions)
        if (this.currentQuestion === 14) { // Question 15 (0-indexed)
            this.showScreen('sub-questions-screen');
        } else {
            this.showScreen('question-screen');
        }

        // Update navigation buttons
        const backBtn = document.getElementById('back-btn');
        const nextBtn = document.getElementById('next-btn');
        
        backBtn.style.display = this.currentQuestion === 0 ? 'none' : 'block';
        nextBtn.disabled = this.answers[this.currentQuestion] === undefined;
    }

    answerQuestion(answer) {
        this.answers[this.currentQuestion] = answer;
        this.saveToLocalStorage();
        
        // Enable next button
        document.getElementById('next-btn').disabled = false;
        
        // Auto-advance for regular questions
        if (this.currentQuestion !== 14) { // Not question 15
            setTimeout(() => this.nextQuestion(), 500);
        }
    }

    handleSubQuestions() {
        const subAnswers = [];
        for (let i = 1; i <= 5; i++) {
            const checkbox = document.getElementById(`sub-q${i}`);
            subAnswers.push(checkbox.checked ? 'Ja' : 'Nein');
        }
        
        // Store sub-answers as a special format
        this.answers[this.currentQuestion] = {
            main: 'Ja', // Default to yes if they're answering sub-questions
            sub: subAnswers
        };
        
        this.saveToLocalStorage();
    }

    nextQuestion() {
        // Handle sub-questions if on question 15
        if (this.currentQuestion === 14) {
            this.handleSubQuestions();
        }

        this.currentQuestion++;
        this.displayQuestion();
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    showCompletionScreen() {
        this.showScreen('completion-screen');
    }

    generateCsv() {
        let csv = 'Vorname,' + this.firstName + '\n';
        csv += 'Frage,Antwort\n';
        
        for (let i = 0; i < this.answers.length; i++) {
            const answer = this.answers[i];
            const questionNumber = i + 1;
            
            if (typeof answer === 'object' && answer.sub) {
                // Handle sub-questions for question 15
                csv += `${questionNumber},${answer.main}\n`;
                for (let j = 0; j < answer.sub.length; j++) {
                    csv += `${questionNumber}.${j + 1},${answer.sub[j]}\n`;
                }
            } else {
                csv += `${questionNumber},${answer}\n`;
            }
        }
        
        return csv;
    }

    sendEmail() {
        const csv = this.generateCsv();
        const subject = encodeURIComponent('Gesundheits- & Fitnessumfrage');
        const body = encodeURIComponent(csv);
        const email = 'franziska.ehret@example.com';
        
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }

    downloadCsv() {
        const csv = this.generateCsv();
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `gesundheitscheck_${this.firstName}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    saveToLocalStorage() {
        const data = {
            firstName: this.firstName,
            answers: this.answers,
            currentQuestion: this.currentQuestion
        };
        localStorage.setItem('healthSurvey', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('healthSurvey');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.firstName = data.firstName || '';
                this.answers = data.answers || [];
                this.currentQuestion = data.currentQuestion || 0;
                
                // Restore UI state
                if (this.firstName) {
                    document.getElementById('firstname').value = this.firstName;
                    document.getElementById('start-btn').disabled = false;
                }
                
                // If we have answers, show the appropriate screen
                if (this.answers.length > 0) {
                    this.displayQuestion();
                }
            } catch (e) {
                console.error('Error loading from localStorage:', e);
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HealthSurveyApp();
}); 