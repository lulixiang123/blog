import React from "react";
import {Card, Divider, Button} from 'antd';
import Relate from "@/types/Relate";
type props={
    relate:Array<Relate>
}
const RelateInfoCard:React.FC<props> = (props) => {
    const relate=props.relate
    return (
        <div id={"relateInfoCard"}>
            <Card title={(<div id={"title"}>联系方式</div>)}>
                {
                    relate.map((item)=>{
                        if(item.displayMethod===0){
                            return (
                                <div className={"directContact"} key={item.relateName}>
                                    <span className={"directContactName"}>{item.relateName}</span>
                                    <span className={"directContactMessage"}>{item.relateIdentification}</span>
                                </div>
                            )
                        }
                    })
                }
                {/*相关联系*/}
                <Divider>
                    <div>其他联系方式</div>
                </Divider>
                <div className={"relevantContact"}>
                    {
                        relate.map((item)=>{
                            if(item.displayMethod===1){
                                return (
                                    <div className={"directContact"} key={item.relateName}>
                                        <Button type={"primary"} block href={item.relateIdentification} style={{fontSize:"1.6rem"}}>{item.relateName}</Button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </Card>
            <style jsx>
                {`
                      #relateInfoCard{
                        margin-top: 20px;
                      }
                      #title{
                        font-size: 2rem;
                      }
                      .directContact{
                        margin: 5px 0;
                        display: flex;
                        justify-content: space-between;
                        font-size: 1.8rem;
                      }
                      .directContactName{
                        font-weight: bold;
                      }
                      .directContactMessage{
                        color: dimgrey;
                      }
                      .relevantContact{
                        margin: 5px 0;
                      }
                      .relevantContactItem{
                        margin: 5px 0;
                      }
                `}
            </style>
        </div>
    );
};
export default RelateInfoCard;