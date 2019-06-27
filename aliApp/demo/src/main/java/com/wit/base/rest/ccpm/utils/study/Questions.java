package com.wit.base.rest.ccpm.utils.study;

import java.util.Arrays;

public class Questions {
    public static int answerJudge(String[] user_answer,String[] session_answer){
        int count_all = 0;
        if (user_answer.length <= session_answer.length) {
            if (Arrays.equals(session_answer,user_answer)) {
                count_all++;
            }
        }
        return count_all;
    }
}
