<template>
    <div class="allIcon clearfix">
        <div class="allIcon_item" v-for="item in iconArray">
            <icon :type="item" class="allIcon_icon"></icon>
            <p class="allIcon_name">{{ item }}</p>
        </div>
    </div>
</template>
<script>
    import {Icon} from '../../../compontents';
    export default {
        components: {
            icon: Icon
        },
        data () {
            return {
                iconArray: ["activities-trend"
                    ,

                    "add-stage"
                    ,

                    "add-user"
                    ,

                    "alert-clock"
                    ,

                    "align-center"
                    ,

                    "align-left"
                    ,

                    "align-right"
                    ,

                    "alpha-book"
                    ,

                    "annotations"
                    ,

                    "archive"
                    ,

                    "arrange"
                    ,

                    "arrow-down"
                    ,

                    "arrow-left"
                    ,

                    "arrow-right"
                    ,

                    "arrow-up"
                    ,

                    "at"
                    ,

                    "board"
                    ,

                    "bold"
                    ,

                    "book"
                    ,

                    "bookkeeping-logo"
                    ,

                    "bookkeeping"
                    ,

                    "box"
                    ,

                    "boxicon"
                    ,

                    "briefcase-stroke"
                    ,

                    "briefcase"
                    ,

                    "building"
                    ,

                    "bulb"
                    ,

                    "bus"
                    ,

                    "calculator"
                    ,

                    "calendar-tick"
                    ,

                    "calendar"
                    ,

                    "calendar2"
                    ,

                    "calendar3"
                    ,

                    "camera"
                    ,

                    "caret"
                    ,

                    "chain"
                    ,

                    "chat-create"
                    ,

                    "chat-group-stroke"
                    ,

                    "chat-group"
                    ,

                    "chat-private-stroke"
                    ,

                    "chat-private"
                    ,

                    "chat-wechat"
                    ,

                    "checkbox-checked"
                    ,

                    "checkbox-ios-checked"
                    ,

                    "checkbox"
                    ,

                    "chevron-down"
                    ,

                    "chevron-left"
                    ,

                    "chevron-right"
                    ,

                    "chevron-up"
                    ,

                    "circle-arrow-down-o"
                    ,

                    "circle-arrow-down"
                    ,

                    "circle-arrow-left-o"
                    ,

                    "circle-arrow-left"
                    ,

                    "circle-arrow-right-o"
                    ,

                    "circle-arrow-right"
                    ,

                    "circle-arrow-up-o"
                    ,

                    "circle-arrow-up"
                    ,

                    "circle-check-o"
                    ,

                    "circle-check"
                    ,

                    "circle-chevron-down-o"
                    ,

                    "circle-chevron-down"
                    ,

                    "circle-chevron-left-o"
                    ,

                    "circle-chevron-left"
                    ,

                    "circle-chevron-right-o"
                    ,

                    "circle-chevron-right"
                    ,

                    "circle-chevron-up-o"
                    ,

                    "circle-chevron-up"
                    ,

                    "circle-cross-thin"
                    ,

                    "circle-cross"
                    ,

                    "circle-down"
                    ,

                    "circle-error-o"
                    ,

                    "circle-error"
                    ,

                    "circle-infinite"
                    ,

                    "circle-info-o-bold"
                    ,

                    "circle-info-o"
                    ,

                    "circle-info"
                    ,

                    "circle-left"
                    ,

                    "circle-left2"
                    ,

                    "circle-message"
                    ,

                    "circle-minus-o"
                    ,

                    "circle-more"
                    ,

                    "circle-plus-o"
                    ,

                    "circle-plus"
                    ,

                    "circle-question-o"
                    ,

                    "circle-question"
                    ,

                    "circle-remove"
                    ,

                    "circle-right"
                    ,

                    "circle-right2"
                    ,

                    "circle-user-o"
                    ,

                    "circle-user"
                    ,

                    "circle"
                    ,

                    "circular-flow"
                    ,

                    "clip"
                    ,

                    "clock"
                    ,

                    "clothes"
                    ,

                    "cog"
                    ,

                    "collapse"
                    ,

                    "collection"
                    ,

                    "comment-line"
                    ,

                    "comment"
                    ,

                    "comments"
                    ,

                    "commit-thin"
                    ,

                    "commit"
                    ,

                    "compass"
                    ,

                    "computer"
                    ,

                    "config"
                    ,

                    "convert"
                    ,

                    "copy-project"
                    ,

                    "copy-task"
                    ,

                    "copy"
                    ,

                    "crop"
                    ,

                    "crown"
                    ,

                    "custom-field"
                    ,

                    "custom-number"
                    ,

                    "custom-text"
                    ,

                    "dashed-right"
                    ,

                    "demo"
                    ,

                    "dig-line"
                    ,

                    "dig"
                    ,

                    "dingding"
                    ,

                    "disable"
                    ,

                    "douban"
                    ,

                    "download"
                    ,

                    "draggable"
                    ,

                    "dribbble"
                    ,

                    "dropbox"
                    ,

                    "earth"
                    ,

                    "edit"
                    ,

                    "emoji"
                    ,

                    "end-date"
                    ,

                    "enter-project"
                    ,

                    "envelope"
                    ,

                    "event-type"
                    ,

                    "evernote"
                    ,

                    "expand"
                    ,

                    "eye-slash"
                    ,

                    "eye"
                    ,

                    "facebook"
                    ,

                    "fangcloud"
                    ,

                    "favorite"
                    ,

                    "file-move"
                    ,

                    "file-move2"
                    ,

                    "file-update"
                    ,

                    "file"
                    ,

                    "file2"
                    ,

                    "file3"
                    ,

                    "file4"
                    ,

                    "fill"
                    ,

                    "filter"
                    ,

                    "flag"
                    ,

                    "focus"
                    ,

                    "folder-add"
                    ,

                    "folder"
                    ,

                    "full-screen-quit"
                    ,

                    "full-screen"
                    ,

                    "git-commit"
                    ,

                    "git-fork"
                    ,

                    "git-issue"
                    ,

                    "git-pull-request"
                    ,

                    "github"
                    ,

                    "globe"
                    ,

                    "google"
                    ,

                    "graph"
                    ,

                    "heading"
                    ,

                    "help"
                    ,

                    "home"
                    ,

                    "horizontal"
                    ,

                    "human"
                    ,

                    "image"
                    ,

                    "import-project"
                    ,

                    "inbox"
                    ,

                    "income"
                    ,

                    "indent"
                    ,

                    "info-single"
                    ,

                    "info"
                    ,

                    "intelligence"
                    ,

                    "intro"
                    ,

                    "italic"
                    ,

                    "jinshuju"
                    ,

                    "jump"
                    ,

                    "lab"
                    ,

                    "leave-state"
                    ,

                    "leave"
                    ,

                    "lightning"
                    ,

                    "link"
                    ,

                    "link2"
                    ,

                    "linkedin"
                    ,

                    "loading"
                    ,

                    "location"
                    ,

                    "lock"
                    ,

                    "loudspeaker"
                    ,

                    "mail"
                    ,

                    "mark-as-read"
                    ,

                    "markdown"
                    ,

                    "meal"
                    ,

                    "medal"
                    ,

                    "member-disable"
                    ,

                    "member-group"
                    ,

                    "members"
                    ,

                    "menu-vertical"
                    ,

                    "menu"
                    ,

                    "message"
                    ,

                    "mobile"
                    ,

                    "more-stroke"
                    ,

                    "more"
                    ,

                    "move-file"
                    ,

                    "move-task"
                    ,

                    "move"
                    ,

                    "multi-selection"
                    ,

                    "mute"
                    ,

                    "netease"
                    ,

                    "new-o"
                    ,

                    "new-schedule"
                    ,

                    "new"
                    ,

                    "normal-text"
                    ,

                    "normal"
                    ,

                    "notebook"
                    ,

                    "nut"
                    ,

                    "office-excel"
                    ,

                    "office-powerpoint"
                    ,

                    "office-word"
                    ,

                    "ol"
                    ,

                    "oldman"
                    ,

                    "order-a"
                    ,

                    "order-desc"
                    ,

                    "ordered-list"
                    ,

                    "org-apps"
                    ,

                    "org-atom"
                    ,

                    "org-avatar"
                    ,

                    "org-book"
                    ,

                    "org-building"
                    ,

                    "org-calendar"
                    ,

                    "org-checkbox-checked"
                    ,

                    "org-chevron-down"
                    ,

                    "org-chevron-right"
                    ,

                    "org-circle-down"
                    ,

                    "org-circle-up"
                    ,

                    "org-crown"
                    ,

                    "org-direct-message"
                    ,

                    "org-dress"
                    ,

                    "org-eye"
                    ,

                    "org-lock"
                    ,

                    "org-medal"
                    ,

                    "org-money"
                    ,

                    "org-projects"
                    ,

                    "org-search"
                    ,

                    "org-user"
                    ,

                    "org-users"
                    ,

                    "org-who"
                    ,

                    "outdent"
                    ,

                    "palette"
                    ,

                    "paperclip"
                    ,

                    "pause"
                    ,

                    "pen"
                    ,

                    "pencil"
                    ,

                    "phone"
                    ,

                    "picture"
                    ,

                    "pin"
                    ,

                    "pin2"
                    ,

                    "play"
                    ,

                    "plus-sign"
                    ,

                    "plus"
                    ,

                    "post-forbidden"
                    ,

                    "post"
                    ,

                    "power"
                    ,

                    "pre"
                    ,

                    "processon"
                    ,

                    "project"
                    ,

                    "pull-request"
                    ,

                    "punctuate"
                    ,

                    "putback-right"
                    ,

                    "putback"
                    ,

                    "qq"
                    ,

                    "qrcode"
                    ,

                    "question"
                    ,

                    "quit"
                    ,

                    "quit2"
                    ,

                    "quote"
                    ,

                    "refresh"
                    ,

                    "remove-link"
                    ,

                    "remove"
                    ,

                    "reorder"
                    ,

                    "repeat"
                    ,

                    "review"
                    ,

                    "rich-text"
                    ,

                    "rss"
                    ,

                    "sale"
                    ,

                    "salesman"
                    ,

                    "scanning"
                    ,

                    "search-member"
                    ,

                    "search-text"
                    ,

                    "search-warning"
                    ,

                    "search"
                    ,

                    "share-chain"
                    ,

                    "share-stroke"
                    ,

                    "share"
                    ,

                    "sharp-down"
                    ,

                    "sharp-down2"
                    ,

                    "sharp-up"
                    ,

                    "sharp-up2"
                    ,

                    "sharp"
                    ,

                    "single-selection"
                    ,

                    "slice"
                    ,

                    "snooze"
                    ,

                    "sort-by-time"
                    ,

                    "sort-by-unread"
                    ,

                    "spread"
                    ,

                    "sprint"
                    ,

                    "stack-cancel"
                    ,

                    "stack-clock-fill"
                    ,

                    "stack-tick-fill"
                    ,

                    "stack-tick"
                    ,

                    "stage"
                    ,

                    "stamp"
                    ,

                    "star-stroke"
                    ,

                    "star"
                    ,

                    "start-date"
                    ,

                    "state-check"
                    ,

                    "state-official"
                    ,

                    "state-other"
                    ,

                    "state-top"
                    ,

                    "state"
                    ,

                    "stationery"
                    ,

                    "statistics-o"
                    ,

                    "statistics"
                    ,

                    "store"
                    ,

                    "story-points"
                    ,

                    "strike-through"
                    ,

                    "switch-workspace"
                    ,

                    "switch"
                    ,

                    "t"
                    ,

                    "table"
                    ,

                    "tachometer"
                    ,

                    "tag-reverse"
                    ,

                    "tag"
                    ,

                    "talk"
                    ,

                    "talkai"
                    ,

                    "task-id"
                    ,

                    "task-type"
                    ,

                    "team-briefcase"
                    ,

                    "team-building"
                    ,

                    "team-bulb"
                    ,

                    "team-bus"
                    ,

                    "team-calculator"
                    ,

                    "team-camera"
                    ,

                    "team-compass"
                    ,

                    "team-flag"
                    ,

                    "team-graph"
                    ,

                    "team-location"
                    ,

                    "team-loudspeaker"
                    ,

                    "team-medal"
                    ,

                    "team-notebook"
                    ,

                    "team-pen"
                    ,

                    "team-stamp"
                    ,

                    "team-talk"
                    ,

                    "team-terminal"
                    ,

                    "team-tie"
                    ,

                    "terminal"
                    ,

                    "text-file"
                    ,

                    "th"
                    ,

                    "tick-thin"
                    ,

                    "tick"
                    ,

                    "tie"
                    ,

                    "time-view"
                    ,

                    "top-up"
                    ,

                    "trash"
                    ,

                    "travel"
                    ,

                    "triangle-down"
                    ,

                    "triangle-left"
                    ,

                    "triangle-right"
                    ,

                    "triangle-up"
                    ,

                    "turn-left"
                    ,

                    "turn-right"
                    ,

                    "twitter"
                    ,

                    "ul-sort"
                    ,

                    "ul"
                    ,

                    "unarchive"
                    ,

                    "unassigned"
                    ,

                    "underline"
                    ,

                    "unlock"
                    ,

                    "unordered-list"
                    ,

                    "unread"
                    ,

                    "update-file"
                    ,

                    "upload-file"
                    ,

                    "upload"
                    ,

                    "user-switch"
                    ,

                    "user"
                    ,

                    "users"
                    ,

                    "video"
                    ,

                    "view-board"
                    ,

                    "wall"
                    ,

                    "warning-o"
                    ,

                    "warning"
                    ,

                    "wave"
                    ,

                    "wechat"
                    ,

                    "weibo"
                    ,

                    "window-max"
                    ,

                    "window-min"
                    ,

                    "wps"
                    ,

                    "xiaomi"
                    ,

                    "yunzhijia"
                    ,

                    "zendesk"
                    ,

                    "zhihu"
                    ,

                    "zoom-in"
                    ,

                    "zoom-out"],
            };
        }
    };
</script>
<style lang="scss" src="./allIcon.scss"></style>
