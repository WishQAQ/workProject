package com.wit.base.rest.ccpm.utils.fee;

import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("Document")
public class TagEntity {
    @XStreamAlias("Head")
    private Head head;

    @XStreamAlias("Body")
    private Body body;

    public Head getHead() {
        return head;
    }

    public void setHead(Head head) {
        this.head = head;
    }

    public Body getBody() {
        return body;
    }

    public void setBody(Body body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return "TagEntity{" +
                "head=" + head +
                ", body=" + body +
                '}';
    }
}