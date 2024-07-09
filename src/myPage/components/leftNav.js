import React from "react";
import "./leftNav.css";

function LeftNav () {
    return (
        <div className="left">
            <li>프로필</li>
            <li>나의 챌린지</li>
            <li>작성 글 목록</li>
            <li>작성 댓글 목록</li>
            <li>내 정보</li>
        </div>
    )
};

export default LeftNav;