from beanie import Document


class QuestionDB(Document):
    question: str
    choices: list[str]
    choicetype: str
    ans:int
    
class MockTestDB(Document):
    name: str
    subjects: list[str]
    questionset: dict[str,QuestionDB]
