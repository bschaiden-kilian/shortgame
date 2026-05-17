import { useNavigate } from 'react-router-dom';
import { Subheading1, Heading1, Body1 } from '../common/components/Text';
import GameCardList from '../features/game/presentation/game_card_list'

const GameSelection = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-10'>
            <div className="w-full flex flex-col gap-1.5">
                <Subheading1>V1.0 - Sandbox</Subheading1>
                <Heading1>Golf Games.</Heading1>
                <Body1>Pick a drill. Log scores. Get out of your own head.</Body1>
            </div>
            <div className='flex flex-col'>
                <nav className='w-full flex justify-between items-center'>
                    <Subheading1>Games</Subheading1>
                    <div className='w-fit h-fit' onClick={() => navigate("/history")}>
                        <Subheading1>History</Subheading1>
                    </div>
                </nav>
                <GameCardList></GameCardList>
            </div>
        </div>
    )
}

export default GameSelection