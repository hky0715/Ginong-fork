package kr.co.ginong.web.service.member;

import kr.co.ginong.web.entity.member.Member;
import kr.co.ginong.web.entity.member.MemberRole;
import kr.co.ginong.web.repository.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImp implements MemberService{

    @Autowired
    private MemberRepository repository;


    @Override
    public Member get(String name) {
        Member member = repository.find(null,name);
        return member;
    }

    @Override
    public Member get(Long id) {
        Member member = repository.find(id,null);
        return member;
    }

    @Override
    public Member getByOrderId(Long orderId) {
        
        return repository.findByOrderId(orderId);
    }


    @Override
    public Long addMember(Member member) {

        repository.insertMember(member);
        Long memberId = member.getId();

        return memberId;

    }

    @Override
    public boolean addRoute(Long memberId, String joinRoute) {

        String name = switch (joinRoute) {
            case "blog" -> "블로그";
            case "internet" -> "인터넷";
            case "sns" -> "SNS";
            case "person" -> "지인추천";
            default -> null;
        };

        int affectedRows=0;

        if(name!=null)
            affectedRows= repository.insertRoute(memberId,name);

        //insert 성공
        if(affectedRows!=0)
            return true;

        //insert 실패
        return false;

    }

    @Override
    public int search(String email, String userName) {
        int valid = repository.searchByNameAndMail(email, userName);

        return valid;
    }

    @Override
    public Member searchId(String email, String name) {
        Member validId = repository.searchByRealNameAndMail(email, name);

        return validId;
    }

    @Override
    public void grantAuthority(MemberRole memberRole) {
        repository.insertAuthorityByUserId(memberRole);
    }


    @Override
    public void changePwd(String pwd, String userName) {
        repository.updateByUserName(pwd, userName);
    }




}
