import "./Tile.css";

type Props = {
  letter: string;
  onSelection: () => void;
  isSelected: boolean;
  isCorrectOrder: boolean;
};
const Tile = ({ letter, onSelection, isSelected, isCorrectOrder }: Props) => {
  return (
    <div
      className={`${isSelected ? "tile-selected" : "tile-unselected"} ${
        isCorrectOrder ? "correct-order" : "incorrect-order"
      } tile`}
      onClick={() => {
        if (!isSelected) {
          onSelection();
        }
      }}
    >
      {letter}
    </div>
  );
};

export default Tile;
