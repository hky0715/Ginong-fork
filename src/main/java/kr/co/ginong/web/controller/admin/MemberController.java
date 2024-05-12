package kr.co.ginong.web.controller.admin;

import kr.co.ginong.web.entity.member.Member;
import kr.co.ginong.web.entity.member.MemberView;
import kr.co.ginong.web.service.admin.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller("adminMemberController")
@RequestMapping("admin/member")
public class MemberController {

    @Autowired
    private MemberService service;

    @GetMapping("/list")
    public String list(
            @RequestParam(name = "q", required = false) String query
            , @RequestParam(name = "p", defaultValue = "1") Integer page
            , Model model) {

        List<Member> list = new ArrayList<>();
        int count = 0; // 회원수 초기화

        if (query != null) {
            list = service.getList(page, query);
            count = service.getCount(query);
        } else {
            list = service.getList(page);
            count = service.getCount();
        }

        int totalMemberCount = service.getTotalMemberCount();

        model.addAttribute("count", count);
        model.addAttribute("members", list);
        model.addAttribute("totalMemberCount", totalMemberCount);

        return "admin/member/list";
    }

    @GetMapping("/detail")
    public String detail(
            @RequestParam(name = "id", required = false) Long memberId
            , Model model) {

        MemberView member = service.get(memberId);

        model.addAttribute("member", member);

        return "admin/member/detail";
    }

    @PostMapping("/detail")
    public String detail(MemberView member){

        service.update(member);

        return "redirect:/admin/member/detail?id="+member.getId();
    }


    @GetMapping("/order_list")
    public String orderList(){

        return "admin/member/orderList";
    }
}
