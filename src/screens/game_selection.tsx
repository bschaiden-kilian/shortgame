import {Subheading1, Heading1, Body1} from '../common/components/Text';
import GameCardList from '../features/game/presentation/game_card_list'

const GameSelection = () => {
    return (
        <div className='flex flex-col gap-10'>
            <div className="w-full flex flex-col gap-1.5">
                <Subheading1>V1.0 - Sandbox</Subheading1>
                <Heading1>Golf Games.</Heading1>
                <Body1>Pick a drill. Log scores. Get out of your own head.</Body1>
            </div>
            <GameCardList></GameCardList>
        </div>
    )
}

export default GameSelection