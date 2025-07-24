"use client";

import { currentTime } from "@/common/mock/time";
import { localUserEmail } from "@/common/mock/user";
import { StarButton } from "@/components/shared";
import { Message } from "@/interfaces";
import { classNames } from "@/utils/classes";
import React, { useCallback, useMemo, useState } from "react";
import Avatar from "./Avatar";

interface PropTypes {
  message: Message;
  divider?: boolean;
  defaultOpened?: boolean;
}

const ONE_HOUR_IN_MS = 1000 * 60 * 60;

export default function ThreadItem({
  message,
  divider,
  defaultOpened = true,
}: PropTypes) {
  const [isOpened, setIsOpened] = useState(defaultOpened);
  const hoursAgo = useMemo(
    () =>
      Math.round(
        (currentTime.getTime() - new Date(message.date).getTime()) /
          ONE_HOUR_IN_MS,
      ),
    [message.date],
  );
  const daysAgo = useMemo(() => Math.round(hoursAgo / 24), [hoursAgo]);

  const handleToggle = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).dataset.clickTrapped === "Y") {
      return;
    }
    setIsOpened((prev) => !prev);
  }, []);

  return (
    <div
      className={classNames("flex flex-col gap-1 px-4 py-5", {
        "border-b border-[#e5e5e5]": divider,
      })}
    >
      <div role="button" onClick={handleToggle}>
        <header className="flex gap-3">
          <Avatar user={message.sender} />
          <div className="flex flex-1 flex-col">
            <div className="flex items-start gap-2">
              <div className="flex flex-1 flex-col">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-semibold">
                    {message.sender.name}
                  </h3>
                  {isOpened && (
                    <span className="text-xs text-gray-500">
                      {`<${message.sender.email}>`}
                    </span>
                  )}
                </div>
                {isOpened && (
                  <span className="text-start text-xs text-gray-600">
                    to{" "}
                    {message.recipients
                      .map((recipient) =>
                        recipient.email === localUserEmail
                          ? "you"
                          : recipient.name,
                      )
                      .join(", ")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {new Date(message.date).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}{" "}
                  {daysAgo > 1
                    ? `(${daysAgo} days ago)`
                    : `(${hoursAgo} hours ago)`}
                </span>
                {message.folder !== "trash" && (
                  <StarButton messageId={message.id} className="-m-1" />
                )}
              </div>
            </div>
            {!isOpened && (
              <p className="text-[13px] whitespace-pre-wrap text-gray-600">
                {message.content}
              </p>
            )}
          </div>
        </header>
      </div>
      {isOpened && (
        <p className="ml-13 text-[13px] whitespace-pre-wrap">
          {message.content}
        </p>
      )}
    </div>
  );
}
