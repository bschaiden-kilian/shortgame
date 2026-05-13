import { Button } from '../common/components/Button';
import { Subheading1, Heading2, Body2 } from '../common/components/Text';
import UserSelectionList from '../features/user/presentation/user_selection_list';

const Pregame = () => {
    return (
        <div className='h-full flex flex-col gap-10'>
            <div className="w-full shrink flex flex-col gap-1.5">
                <Subheading1>Game</Subheading1>
                <Heading2>Tee Lagputting</Heading2>
                <Body2>
                    Hit 3 balls each round, trying to land between the front of the hole and 10% past it (1ft for a 10ft putt).
                    1 point in the zone. 2 points holed. Most points after 10 rounds wins.
                </Body2>
            </div>
            <UserSelectionList></UserSelectionList>
            <div className='h-12 w-full shrink'>
                <Button onClick={() => console.log("click")}>Start Game</Button>
            </div>
        </div>
    )
}

export default Pregame; 