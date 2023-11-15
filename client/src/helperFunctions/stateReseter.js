import { useDispatch } from "react-redux";
import { activityActions } from "../store/activitySlice";
import { communityActions } from "../store/communitySlice";
import { performanceActions } from "../store/PerformanceSlice";
import { signinActions } from "../store/signinSlice";
import { signupActions } from "../store/signupSlice";
import { tableDataActions } from "../store/TableDataSlice";
import { timelineActions } from "../store/timelineSlice";
import { userActions } from "../store/userSlice";

const useActions = () => {
    const dispatch = useDispatch();
    dispatch(activityActions.activityReseter());
    dispatch(communityActions.communityStateReseter())
    dispatch(performanceActions.performanceStateReseter())
    dispatch(signinActions.siginStateReseter())
    dispatch(signupActions.sigupStateReseter())
    dispatch(tableDataActions.tableDataStateReseter())
    dispatch(timelineActions.timelineResetAction())
    dispatch(userActions.userReseter())
}

export default useActions;