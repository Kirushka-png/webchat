export interface IDiagnResult{
    title: string,
    level: string
}

export interface IDiagnResult2 extends IDiagnResult{
    discription: string
}
const mockdataResult3 ={
    titles : ['1 блок: Поведение','2 блок: Мышление','3 блок: Чувства','4 блок: Здоровье'],
    levels: ['низкий уровень изменений', 'средний  уровень изменений','высокий уровень изменений']
}
const mockdataResult2 = {
    titles : ['Копинг, ориентированный на решение задачи, проблемы','Копинг, ориентированный на эмоции','Копинг, ориентированный на избегание'],
    power: ['Низкая степень выраженности','Средняя степень выраженности','Высокая степень выраженности'],
    discriptions: ['Базируется на стараниях человека усовершенствовать взаимоотношения с внешней средой с помощью изменения когнитивной оценки конкретной ситуации и представляет собой намеренные проблемно-фокусированные усилия по изменению ситуации, включающие аналитический подход к решению проблемы.',
    'Содержит в себе такие мысли и действия, целью которых является снижение физического или психологического давления стресса.',
    'Характеризуется мысленным стремлением и поведенческими усилиями, направленными к бегству или избеганию проблемы.']
}
const mockdataResult1 ={
    titles : ['Эмоциональное истощение','Деперсонализация','Редукция личных достижений'],
    levels: ['Низкий уровень','Средний уровень','Высокий уровень','Очень высокий уровень'],
    power: ['Низкая степень','Средняя степень','Высокая степень', 'Крайне высокая степень']
}

export const AnswersIntoResultDiagn1 = (answers: number[]) => {
    let result = [0,0,0,0];
    let values:IDiagnResult[]  = [{title: '', level: ''},{title: '', level: ''},{title: '', level: ''},{title: '', level: ''}];
    [1,2,3,6,8,13,14,16,20].forEach(element => {
        result[1] += answers[element-1]
    });
    [5,10,11,15,22].forEach(element => {
        result[2] += answers[element-1]
    });
    [4,7,9,12,17,18,19,21].forEach(element => {
        result[3] += answers[element-1]
    });
    result[1] < 16 ? result[0] += 1 : result[1] < 25 ? result[0] += 2 : result[1] < 35 ? result[0] += 3 : result[0] += 5
    result[2] < 5 ? result[0] += 1 : result[2] < 13 ? result[0] += 2 : result[2] < 16 ? result[0] += 3 : result[0] += 5
    result[3] < 22 ? result[0] += 5 : result[3] < 28 ? result[0] += 3 : result[3] < 36 ? result[0] += 2 : result[0] += 1
    values[0].level = `${result[0]} балл(ов) - `
    result[0] < 5 ? values[0].level += mockdataResult1.power[0] : result[0] < 7 ? values[0].level += mockdataResult1.power[1] : result[0] < 10 ? values[0].level += mockdataResult1.power[2] : values[0].level += mockdataResult1.power[3]
    values[0].title = 'Интегральный показатель выгорания:'
    values[1].title = mockdataResult1.titles[0]
    values[2].title = mockdataResult1.titles[1]
    values[3].title = mockdataResult1.titles[2]
    values[1].level = result[1] < 16 ? mockdataResult1.levels[0] : result[1] < 25 ? mockdataResult1.levels[1] : result[1] < 35 ? mockdataResult1.levels[2] : mockdataResult1.levels[3]
    values[2].level = result[2] < 5 ? mockdataResult1.levels[0] : result[2] < 13 ? mockdataResult1.levels[1] : result[2] < 16 ? mockdataResult1.levels[2] : mockdataResult1.levels[3]
    values[3].level = result[3] < 22 ? mockdataResult1.levels[3] : result[3] < 28 ?mockdataResult1.levels[2] : result[3] < 36 ? mockdataResult1.levels[1] : mockdataResult1.levels[0]
    return values
}

export const AnswersIntoResultDiagn2 = (answers: number[]) => {
    let tempAnswers: number[] = answers.map((value) => value == 0 ? [1,0] : [0,1]).flat()
    let result = [0,0,0];
    let values:IDiagnResult2[]  = [{title: '', level: '',discription: ''},{title: '', level: '',discription: ''},{title: '', level: '',discription: ''}];
    [1,4,7,9,14,15,19,22].forEach(element => {
        result[0] += tempAnswers[element-1] as number
    });
    [2,5,8,11,13,18,20,23].forEach(element => {
        result[1] += tempAnswers[element-1] as number
    });
    [3,6,10,12,16,17,21,24].forEach(element => {
        result[2] += tempAnswers[element-1] as number
    });
    values.forEach((element, index) => {
        element.title = mockdataResult2.titles[index]
        element.discription = mockdataResult2.discriptions[index]
        element.level = `${result[index]} балл(ов) - `
        element.level += result[index] < 3 ? mockdataResult2.power[0] : result[index] < 6 ? mockdataResult2.power[1] :  mockdataResult2.power[2]
    });
    return values
}

export const AnswersIntoResultDiagn3 = (answers: number[]) => {
    let values:IDiagnResult[]  = [{title: '', level: ''},{title: '', level: ''},{title: '', level: ''},{title: '', level: ''}];
    mockdataResult3.titles.forEach((element, index) => {
        let tempResult: number = 0
        answers.slice(index * 5, index * 5 + 5).forEach(element => {
            tempResult += element
        });
        values[index].title = element
        values[index].level = `${tempResult} балл(ов) - `
        values[index].level += tempResult < 11 ? mockdataResult3.levels[0] : tempResult < 21 ? mockdataResult3.levels[1] :  mockdataResult3.levels[2]
    });
    return values
}