import Card from "../../../common/components/Card"
import type Game from '../data/game_model'
import { Body2, Heading2, Subheading2 } from '../../../common/components/Text'

interface IGameCardProps {
  game: Game
}

const GameCard = (props : IGameCardProps) => {
  return (
    <Card>
      <div className="flex gap-1">
        {props.game.tags.map((e) => 
            <div className="bg-mist-800 rounded-full px-3 py-1">
              <Subheading2>{e}</Subheading2>
            </div>
        )} 
      </div>
      <Heading2>{props.game.name}</Heading2>
      <Body2>{props.game.description}</Body2>
      <h3 className=" text-emerald-500 self-end font-mono text-xs font-light tracking-tighter uppercase ">Tap to Start →</h3>
    </Card>
  )
}

export default GameCard