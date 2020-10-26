import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { setStaticTexts, setMainText, setChoicesTexts } from 'app/LanguageSlice'
import { selectPage } from 'components/Choices/ChoicesSlice'
import BattleOverview from 'components/BattleOverview/BattleOverview' // The component with info on you and your current opponent
import Choices from 'components/Choices/Choices' // The list of choices you can make at the moment
import Battle from 'components/Battle/Battle' // 
import Text from 'components/Text/Text' // The component with the current page text
import ReduxDebug from './ReduxDebug'

import pages from 'assets/pages' // All static data for the pages
import './App.scss';

interface IAppProps {
    lang: any //TODO
}

function App(props: IAppProps){
    const dispatch = useDispatch()
    const page = useSelector(selectPage)
    const battle = pages[page].battle

    const generalTexts = props.lang.general
    const opponentsTexts = props.lang.opponents
    const choicesTexts = props.lang[page].choices
    const abilitiesTexts = props.lang.abilities   

    dispatch(setStaticTexts(props.lang))
    dispatch(setMainText(props.lang[page].mainText))
    dispatch(setChoicesTexts(props.lang[page].choices))

    useEffect(() => {
        dispatch(setMainText(props.lang[page].mainText))
        dispatch(setChoicesTexts(props.lang[page].choices))
    })
    

    return (
        <div>
            <ReduxDebug />
            <h1>#{page}</h1> 
             
            {battle &&          
                <BattleOverview
                    battle={battle}
                    opponentsTexts={opponentsTexts}
                    generalTexts={generalTexts}
                />
            }
            <Text />  
            <Battle />
            <Choices 
                abilitiesTexts={abilitiesTexts} 
                choicesTexts={choicesTexts}                 
                choices={pages[page].choices}
            />
        </div>           
    )
}

export default App;
