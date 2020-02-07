import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {nouns} from './nouns';
import {adjectives} from './adjectives';
type SentenceTemplate = {
  sentence: string;
  partsOfSpeech: string[];
};

const sentenceTemplates: SentenceTemplate[] = [
  {sentence: "You're as %adj% as a %n%", partsOfSpeech: ['adj', 'n']},
  {sentence: 'You have a %n% like a %n%', partsOfSpeech: ['n', 'n']},
  {
    sentence: 'My %n% is more %adj% than your %n%',
    partsOfSpeech: ['n', 'adj', 'n'],
  },
];

interface StringMap {
  [key: string]: string[];
}

const wordLists: StringMap = {
  n: nouns,
  adj: adjectives,
};

const getRandomWord = (partOfSpeech: string) => {
  const randomNumber = Math.random() * (wordLists[partOfSpeech].length - 1);
  const wordListIndex = Math.round(randomNumber);
  return wordLists[partOfSpeech][wordListIndex];
};

const fillInSentence = (sentenceTemplate: SentenceTemplate) => {
  let replacedSentence = sentenceTemplate.sentence;

  sentenceTemplate.partsOfSpeech.map(part => {
    const word = getRandomWord(part);
    const match = new RegExp(`%${part}%`);
    replacedSentence = replacedSentence.replace(match, word);
  });

  return replacedSentence;
};

const generateSentence = () => {
  const randomNumber = Math.round(
    Math.random() * (sentenceTemplates.length - 1),
  );
  const template = sentenceTemplates[randomNumber];
  return fillInSentence(template);
};

const App = () => {
  const [sentence, setSentence] = useState(generateSentence());

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{marginBottom: 10}}>{sentence}</Text>
          <TouchableOpacity
            onPress={() => {
              setSentence(generateSentence());
            }}>
            <Text>Create devastating insult</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
export default App;
