import { Star, StarHalf } from "lucide-react";
import { Colors } from "./Color";


export const starGenerator = (
  rating,
  stroke = "0",
  size,
  fill = Colors.customYello
) => {
  return Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;

    return (
      <span key={index}>
        {rating >= index + 1 ? (
            <Star fill={fill} stroke={stroke} size={size} />
        ): rating >= number? (
            <StarHalf  fill={fill} stroke = {stroke} size ={size} />           
        ):(<Star stroke ={Colors.customYello}  size={size}/>) }
      </span>
    );
  });
};
