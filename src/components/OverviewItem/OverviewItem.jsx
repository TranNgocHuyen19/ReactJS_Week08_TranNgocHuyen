import { CaretUpOutlined } from "@ant-design/icons";

export const OverviewItem = ({
  title,
  background,
  color,
  value,
  percentageChange,
  icon,
}) => {
  return (
    <div
      className={`grid grid-cols-4 text-left p-2 rounded-sm shadow-sm gap-5 border border-gray-200 ${background} `}
    >
      <div className="col-span-3">
        <p className="font-bold m-2">{title}</p>
        <p className="text-4xl font-bold m-2 m">{value}</p>
        <p className=" m-2">
          <span className="text-green-600 font-semibold">
            <CaretUpOutlined />
            {percentageChange}%
          </span>
          <span className="ml-1"> period of change</span>
        </p>
      </div>
      <div className="flex justify-end m-2 ">
        <div className={`p-2 rounded-sm  w-10 h-10 border border${color} `}>
          {icon}
        </div>
      </div>
    </div>
  );
};
