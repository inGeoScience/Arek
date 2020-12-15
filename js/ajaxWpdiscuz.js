//为Ajax适配Wpdiscuz
if (wpdiscuzLoadRichEditor)
    var wpDiscuzEditor = new WpdEditor;
function wpdMessagesOnInit(e, t) {
    wpdiscuzAjaxObj.setCommentMessage(e, t),
    setTimeout(function() {
        location.href = location.href.substring(0, location.href.indexOf("wpdiscuzUrlAnchor") - 1)
    }, 3e3)
}
wpdiscuzAjaxObj.setCommentMessage = function(e, t, a) {
    var o = "wpdiscuz-message-error";
    if (e instanceof Array)
        for (var n in e)
            t instanceof Array ? "success" === t[n] ? o = "wpdiscuz-message-success" : "warning" === t[n] && (o = "wpdiscuz-message-warning") : "success" === t ? o = "wpdiscuz-message-success" : "warning" === t && (o = "wpdiscuz-message-warning"),
            jQuery("<div/>").addClass(o).html(e[n]).prependTo("#wpdiscuz-comment-message").delay(a instanceof Array ? a[n] : a || 4e3).fadeOut(1e3, function() {
                jQuery(this).remove()
            });
    else
        "success" === t ? o = "wpdiscuz-message-success" : "warning" === t && (o = "wpdiscuz-message-warning"),
        jQuery("<div/>").addClass(o).html(e).prependTo("#wpdiscuz-comment-message").delay(a || 4e3).fadeOut(1e3, function() {
            jQuery(this).remove()
        })
}
,
jQuery(document).ready(function(e) {
    e("body").addClass("wpdiscuz_" + wpdiscuzAjaxObj.version);
    var t = wpdiscuzAjaxObj.is_user_logged_in
      , a = 1 == wpdiscuzAjaxObj.wc_captcha_show_for_guest && !t
      , o = 1 == wpdiscuzAjaxObj.wc_captcha_show_for_members && t
      , n = wpdiscuzAjaxObj.wpDiscuzReCaptchaVersion
      , d = parseInt(wpdiscuzAjaxObj.commentListLoadType)
      , s = parseInt(wpdiscuzAjaxObj.wc_post_id)
      , i = parseInt(wpdiscuzAjaxObj.commentListUpdateType)
      , c = 1e3 * parseInt(wpdiscuzAjaxObj.commentListUpdateTimer)
      , p = parseInt(wpdiscuzAjaxObj.liveUpdateGuests)
      , r = wpdiscuzAjaxObj.loadLastCommentId
      , l = r
      , m = parseInt(wpdiscuzAjaxObj.firstLoadWithAjax);
    Cookies.get("wpdiscuz_comments_sorting") && Cookies.remove("wpdiscuz_comments_sorting", {
        path: ""
    }),
    Cookies.get("wordpress_last_visit") && Cookies.remove("wordpress_last_visit", {
        path: ""
    }),
    Cookies.get("wpdiscuz_last_visit") && Cookies.remove("wpdiscuz_last_visit", {
        path: ""
    });
    var w, u = wpdiscuzAjaxObj.storeCommenterData, f = parseInt(wpdiscuzAjaxObj.wmuEnabled), h = wpdiscuzAjaxObj.isCookiesEnabled, b = !0, g = wpdiscuzAjaxObj.cookiehash, _ = parseInt(wpdiscuzAjaxObj.isLoadOnlyParentComments), v = parseInt(wpdiscuzAjaxObj.enableDropAnimation) ? 500 : 0, z = parseInt(wpdiscuzAjaxObj.isNativeAjaxEnabled), j = parseInt(wpdiscuzAjaxObj.enableBubble), C = parseInt(wpdiscuzAjaxObj.bubbleLiveUpdate), k = parseInt(wpdiscuzAjaxObj.bubbleHintTimeout), x = parseInt(wpdiscuzAjaxObj.bubbleHintHideTimeout) ? parseInt(wpdiscuzAjaxObj.bubbleHintHideTimeout) : 5, y = parseInt(wpdiscuzAjaxObj.bubbleShowNewCommentMessage), O = wpdiscuzAjaxObj.bubbleLocation, A = wpdiscuzAjaxObj.inlineFeedbackAttractionType, I = [], T = [], D = [], E = !1, M = 1, F = e("html").css("scroll-behavior"), L = e("body").css("scroll-behavior");
    (e(".wc_social_plugin_wrapper .wp-social-login-provider-list").length ? e(".wc_social_plugin_wrapper .wp-social-login-provider-list").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content") : e(".wc_social_plugin_wrapper .the_champ_login_container").length ? e(".wc_social_plugin_wrapper .the_champ_login_container").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content") : e(".wc_social_plugin_wrapper .social_connect_form").length ? e(".wc_social_plugin_wrapper .social_connect_form").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content") : e(".wc_social_plugin_wrapper .oneall_social_login_providers").length && e(".wc_social_plugin_wrapper .oneall_social_login .oneall_social_login_providers").clone().prependTo("#wpdiscuz_hidden_secondary_form > .wpd-form-wrapper >  .wpd-secondary-forms-social-content"),
    wpdiscuzLoadRichEditor && e("#wpd-editor-0_0").length && wpDiscuzEditor.createEditor("#wpd-editor-0_0"),
    window.addEventListener("beforeunload", function(t) {
        var a = e(".wpd-form").not(":hidden");
        if (a.length)
            if (wpdiscuzLoadRichEditor) {
                for (var o = 0; o < a.length; o++)
                    if ("\n" !== wpDiscuzEditor.createEditor(e(a[o]).find(".ql-container").attr("id")).getText())
                        return t.preventDefault(),
                        void (t.returnValue = "")
            } else
                for (o = 0; o < a.length; o++)
                    if (e(a[o]).find(".wc_comment").val())
                        return t.preventDefault(),
                        void (t.returnValue = "")
    }),
    e(document).delegate("#wpdcom .ql-editor, #wpdcom .wc_comment", "focus", function() {
        e(".wpd-form-foot", e(this).parents(".wpd_comm_form")).slideDown(v)
    }),
    e(document).delegate("#wpdcom textarea", "focus", function() {
        e(this).next(".autogrow-textarea-mirror").length || e(this).autoGrow()
    }),
    t);
    if (e(".wpd-vote-down.wpd-dislike-hidden").remove(),
    e(".wpd-toolbar-hidden").prev("[id^=wpd-editor-]").css("border-bottom", "1px solid #dddddd"),
    e(document).delegate("#wpd-editor-source-code-wrapper-bg", "click", function() {
        e(this).hide(),
        e("#wpd-editor-source-code-wrapper").hide(),
        e("#wpd-editor-uid").val(""),
        e("#wpd-editor-source-code").val("")
    }),
    wpdiscuzLoadRichEditor && e(document).delegate("#wpd-insert-source-code", "click", function() {
        var t = wpDiscuzEditor.createEditor("#" + e("#wpd-editor-uid").val());
        t.deleteText(0, t.getLength(), Quill.sources.USER);
        var a = e("#wpd-editor-source-code").val();
        a.length && t.clipboard.dangerouslyPasteHTML(0, a, Quill.sources.USER),
        t.update(),
        e("#wpd-editor-source-code-wrapper-bg").hide(),
        e("#wpd-editor-source-code-wrapper").hide(),
        e("#wpd-editor-uid").val(""),
        e("#wpd-editor-source-code").val("")
    }),
    e(document).delegate(".wpd-reply-button", "click", function() {
        var d = G(e(this), 0);
        e(this).hasClass("wpdiscuz-clonned") ? (wpdiscuzLoadRichEditor ? setTimeout(function() {
            wpDiscuzEditor.createEditor("#wpd-editor-" + d).focus()
        }, v) : setTimeout(function() {
            e("#wc-textarea-" + d).trigger("focus")
        }, v),
        e("#wpd-secondary-form-wrapper-" + d).slideToggle(v)) : function(a) {
            var o = G(a, 0);
            e("#wpdiscuz_form_anchor-" + o).before(function(t) {
                return e("#wpdiscuz_hidden_secondary_form").html().replace(/wpdiscuzuniqueid/g, t)
            }(o));
            var n = e("#wpd-secondary-form-wrapper-" + o);
            if (!t) {
                var d = {
                    comment_author: Cookies.get("comment_author_" + g),
                    comment_author_email: Cookies.get("comment_author_email_" + g),
                    comment_author_url: Cookies.get("comment_author_url_" + g)
                };
            }
            wpdiscuzLoadRichEditor ? setTimeout(function() {
                wpDiscuzEditor.createEditor("#wpd-editor-" + o).focus()
            }, v) : setTimeout(function() {
                e("#wc-textarea-" + o).trigger("focus")
            }, v);
            n.slideToggle(v, function() {
                a.addClass("wpdiscuz-clonned")
            })
        }(e(this)),
        function(t) {
            if ((a || o) && "2.0" === n) {
                var d = $(t);
                setTimeout(function() {
                    if (!T[d])
                        try {
                            T[d] = grecaptcha.render("wpdiscuz-recaptcha-" + t, {
                                sitekey: wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,
                                theme: wpdiscuzAjaxObj.wpDiscuzReCaptchaTheme,
                                callback: function(a) {
                                    e("#wpdiscuz-recaptcha-field-" + t).val("key")
                                },
                                "expired-callback": function() {
                                    e("#wpdiscuz-recaptcha-field-" + t).val("")
                                }
                            })
                        } catch (e) {
                            console.log(e),
                            wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: " + e.message, "error")
                        }
                }, 1e3)
            }
        }(d)
    }),
    e(document).delegate("#wpdcom .wpd-comment-link [data-comment-url]", "click", function() {
        var t = e(this).data("comment-url")
          , a = e("<input/>");
        a.appendTo("body").css({
            position: "absolute",
            top: "-10000000px"
        }).val(t),
        a.select(),
        document.execCommand("copy"),
        a.remove(),
        wpdiscuzAjaxObj.setCommentMessage(t + "<br/>" + wpdiscuzAjaxObj.wc_copied_to_clipboard, "success", 5e3)
    }),
    e(document).delegate(".wpdiscuz-nofollow,.wc_captcha_refresh_img,.wpd-load-more-submit", "click", function(e) {
        e.preventDefault()
    }),
    e(document).delegate(".wpd-toggle.wpd_not_clicked", "click", function() {
        var t = e(this);
        t.removeClass("wpd_not_clicked");
        var a = G(e(this), 0)
          , o = e(this)
          , n = e(".fas", o);
        !o.parents(".wpd-comment:not(.wpd-reply)").children(".wpd-reply").length && _ ? function(t, a) {
            var o = $(t)
              , n = new FormData;
            n.append("action", "wpdShowReplies"),
            n.append("commentId", o),
            me(z, !0, n).done(function(o) {
                a.addClass("wpd_not_clicked"),
                "object" == typeof o && o.success && (e("#wpd-comm-" + t).replaceWith(o.data.comment_list),
                e("#wpd-comm-" + t + " .wpd-toggle .fas").removeClass("fa-chevron-down").addClass("fa-chevron-up"),
                e("#wpd-comm-" + t + " .wpd-toggle").attr("wpd-tooltip", wpdiscuzAjaxObj.wc_hide_replies_text),
                e("#wpd-comm-" + t + " .wpd-toggle .wpd-view-replies").remove(),
                le(o)),
                e("#wpdiscuz-loading-bar").fadeOut(250)
            }).fail(function(t, o, n) {
                console.log(n),
                a.addClass("wpd_not_clicked"),
                e("#wpdiscuz-loading-bar").fadeOut(250)
            })
        }(a, t) : e("#wpd-comm-" + a + "> .wpd-reply").slideToggle(700, function() {
            e(this).is(":hidden") ? (n.removeClass("fa-chevron-up"),
            n.addClass("fa-chevron-down"),
            o.attr("wpd-tooltip", wpdiscuzAjaxObj.wc_show_replies_text)) : (n.removeClass("fa-chevron-down"),
            n.addClass("fa-chevron-up"),
            o.attr("wpd-tooltip", wpdiscuzAjaxObj.wc_hide_replies_text)),
            t.addClass("wpd_not_clicked")
        })
    }),
    e(document).delegate(".wpd-new-loaded-comment", "mouseenter", function() {
        e(this).removeClass("wpd-new-loaded-comment")
    }),
    e(document).delegate(".wpd-sbs-toggle", "click", function() {
        e(".wpdiscuz-subscribe-bar").slideToggle(v)
    }),
    parseInt(wpdiscuzAjaxObj.wpDiscuzIsShowOnSubscribeForm) && !t && wpdiscuzAjaxObj.wpDiscuzReCaptchaSK && e("#wpdiscuz-subscribe-form").length && ("2.0" === n ? (setTimeout(function() {
        try {
            grecaptcha.render("wpdiscuz-recaptcha-subscribe-form", {
                sitekey: wpdiscuzAjaxObj.wpDiscuzReCaptchaSK,
                theme: wpdiscuzAjaxObj.wpDiscuzReCaptchaTheme,
                callback: function(t) {
                    e("#wpdiscuz-recaptcha-field-subscribe-form").val("key")
                },
                "expired-callback": function() {
                    e("#wpdiscuz-recaptcha-field-subscribe-form").val("")
                }
            })
        } catch (e) {
            console.log(e),
            wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: " + e.message, "error")
        }
    }, 1e3),
    e(document).delegate("#wpdiscuz-subscribe-form", "submit", function(t) {
        e("#wpdiscuz-recaptcha-field-subscribe-form").val() ? e(".wpdiscuz-recaptcha", e(this)).css("border", "none") : (e(".wpdiscuz-recaptcha", e(this)).css("border", "1px solid red"),
        t.preventDefault())
    })) : "3.0" === n && e(document).delegate("#wpdiscuz_subscription_button", "click", function(t) {
        var a = e(this).parents("#wpdiscuz-subscribe-form");
        t.preventDefault();
        try {
            grecaptcha.ready(function() {
                grecaptcha.execute(wpdiscuzAjaxObj.wpDiscuzReCaptchaSK, {
                    action: "wpdiscuz/wpdAddSubscription"
                }).then(function(e) {
                    console.log(5555),
                    document.getElementById("wpdiscuz-recaptcha-field-subscribe-form").value = e,
                    a.submit()
                }, function(e) {
                    wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error", "error"),
                    console.log(e)
                })
            })
        } catch (t) {
            console.log(t),
            wpdiscuzAjaxObj.setCommentMessage("reCaptcha Error: " + t.message, "error")
        }
    })),
    (a || o) && "2.0" === n) {
        var R = e(window).width()
          , S = e("#wpdcom").width();
        S >= 1100 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.9)",
            "-webkit-transform": "scale(0.9)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.9)",
            "-webkit-transform": "scale(0.9)"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({
            width: "65%"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({
            width: "35%"
        })),
        S >= 940 && S < 1100 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.9)",
            "-webkit-transform": "scale(0.9)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.9)",
            "-webkit-transform": "scale(0.9)"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({
            width: "60%"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({
            width: "40%"
        })),
        S >= 810 && S < 940 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            transform: "scale(0.9)",
            "-webkit-transform": "scale(0.9)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            transform: "scale(0.8)",
            "-webkit-transform": "scale(0.8)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({
            width: "40%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({
            width: "60%"
        })),
        S >= 730 && S < 810 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            transform: "scale(0.9)",
            "-webkit-transform": "scale(0.9)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.8)",
            "-webkit-transform": "scale(0.8)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({
            width: "45%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({
            width: "55%"
        })),
        S >= 610 && S < 730 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            transform: "scale(0.85)",
            "-webkit-transform": "scale(0.85)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            transform: "scale(0.8)",
            "-webkit-transform": "scale(0.8)"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({
            width: "43%"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({
            width: "55%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({
            width: "30%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({
            width: "70%"
        })),
        R > 650 && (S >= 510 && S < 610 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "center 0",
            "-webkit-transform-origin": "center 0",
            transform: "scale(0.77)",
            "-webkit-transform": "scale(0.77)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.77)",
            "-webkit-transform": "scale(0.77)"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({
            width: "35%"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({
            width: "63%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({
            width: "30%",
            position: "relative",
            right: "-60px"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({
            width: "70%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wc-form-footer").css({
            "margin-left": "0px"
        })),
        S >= 470 && S < 510 && (e("#wpdcom .wpd_main_comm_form .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "center 0",
            "-webkit-transform-origin": "center 0",
            transform: "scale(0.77)",
            "-webkit-transform": "scale(0.77)"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            "transform-origin": "right 0",
            "-webkit-transform-origin": "right 0",
            transform: "scale(0.77)",
            "-webkit-transform": "scale(0.77)"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-left").css({
            width: "40%"
        }),
        e("#wpdcom .wpd_main_comm_form .wpd-form-col-right").css({
            width: "60%"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-left").css({
            float: "none",
            width: "100%",
            display: "block"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wpd-form-col-right").css({
            float: "none",
            width: "100%",
            display: "block"
        }),
        e("#wpdcom .wpd_main_comm_form .wc-form-footer").css({
            "margin-left": "0px"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wc-form-footer").css({
            "margin-left": "0px"
        })),
        S < 470 && (e("#wpdcom .wpd-secondary-form-wrapper .wpd-field-captcha .wpdiscuz-recaptcha").css({
            margin: "0px auto",
            "transform-origin": "center 0",
            "-webkit-transform-origin": "center 0"
        }),
        e("#wpdcom .wpd-form-col-left").css({
            float: "none",
            width: "100%",
            display: "block"
        }),
        e("#wpdcom .wpd-form-col-right").css({
            float: "none",
            width: "100%",
            display: "block"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wc-form-footer").css({
            "margin-left": "0px"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wc_notification_checkboxes").css({
            "text-align": "center"
        }),
        e("#wpdcom .wpd-secondary-form-wrapper .wc-field-submit").css({
            "text-align": "center"
        })))
    }
});