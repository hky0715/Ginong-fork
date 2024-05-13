package kr.co.ginong.web.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.ginong.web.entity.notice.Notice;
import kr.co.ginong.web.service.user.NoticeService;

@Controller("adminNoticeController")
@RequestMapping("admin/notice")
public class NoticeController {

    // @Autowired
    // private NoticeService service;

    @GetMapping("list")
    public String list() {
        return "admin/notice/list";
    }

    @GetMapping("detail")
    // public String detail(@RequestParam(name="noticeId") Long noticeId, Model model) {
    //     Notice notice = service.getById(noticeId);

    //     model.addAttribute("notice", notice);
    //     return "admin/notice/detail";
    // }
    public String detail() {
        return "admin/notice/detail";
    }

    @GetMapping("reg")
    public String reg() {
        return "admin/notice/reg";
    }

    @GetMapping("update")
    public String update() {
        return "admin/notice/update";
    }
}
