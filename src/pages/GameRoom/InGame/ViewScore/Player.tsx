export const Player = () => {
  return (
    <div>
      <div />
      <img alt="profile_img" />
      <div>nickname님</div>
      {/* 1 */}
      <div>
        <span>score</span>
        <span>타</span>
      </div>
      {/* 2 */}
      <span>|</span>
      {/* 3 */}
      <div>
        <div>
          <span>money</span>
          <span>원</span>
        </div>
        <span>moneyChangeFromPreviousHole</span>
      </div>
    </div>
  );
};
